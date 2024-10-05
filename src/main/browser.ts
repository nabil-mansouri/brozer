import {
  BrowserView,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  HandlerDetails,
  screen,
  WebPreferences,
  globalShortcut,
  app,
  protocol
} from 'electron'
import { createContextMenu } from './context_menu'
import { join } from 'path'
import url from 'url'
import icon from '../../resources/icon.png?asset'
import { BrowserControlsMain } from './browser_controls_main'
import { BrowserState, BrowserStateMain } from './browser_state_main'
import { navigationUtils } from './navigation_utils'
import { fadeWindowIn, fadeWindowOut } from './animation_utils'
import { BrowserWindowOptions } from '../common/browser_controls_interface'

export interface BrowserOption {
  debug: boolean
  controlHeight?: number
  blankTitle?: string
  onNewWindow?: (e: HandlerDetails) => void
}
export class Browser {
  mainWindow: BrowserWindow
  browserStateMain?: BrowserStateMain
  browserControlMain?: BrowserControlsMain
  //private
  constructor(
    public options: BrowserOption = {
      debug: false
    }
  ) {
    // create window
    this.mainWindow = this.createMainWindow()
    //debug option
    if (this.options.debug) {
      this.mainWindow.webContents.openDevTools({ mode: 'detach' })
    }
    // control
    const control = new BrowserControlsMain(this)
    control.bind()
    this.mainWindow.on('closed', () => {
      // Remember to clear all ipcMain events as ipcMain bind
      // on every new browser instance
      control.unbind()
      // Prevent BrowserView memory leak on close
      if (this.browserStateMain) {
        for (const key of this.browserStateMain.views) {
          this.destroyView(key.viewId)
        }
      }
    })
    // register custom scheme
    this.registerScheme()
  }

  createMainWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize
    const win = new BrowserWindow({
      titleBarStyle: 'hidden',
      trafficLightPosition: { x: 10, y: 15 },
      width,
      height,
      show: false,
      autoHideMenuBar: true,
      ...(process.platform === 'linux' ? { icon } : {}),
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        // cannot use sandbox and preload script
        sandbox: false,
        webSecurity: true,
        contextIsolation: true,
        nodeIntegration: false,
        devTools: this.options.debug
      }
    })
    return win
  }
  registerScheme() {
    app.whenReady().then(() => {
      protocol.registerFileProtocol(navigationUtils.BROW_SCHEME, (request, callback) => {
        const nameWithoutScheme = request.url.slice(`${navigationUtils.BROW_SCHEME}://`.length)
        const path = join(__dirname, `../renderer/${nameWithoutScheme}.html`)
        const filename = `file://${path}`
        const filePath = url.fileURLToPath(filename)
        callback(filePath)
      })
    })
  }

  get state(): BrowserState {
    return (
      this.browserStateMain?.state ??
      ({
        views: [],
        jsAttached: [],
        downloads: [],
        foundResult: undefined,
        windows: []
      } as BrowserState)
    )
  }

  async closeModal(id: number): Promise<void> {
    const nativeModal = this.browserStateMain?.getNativeModalById(id)
    if (nativeModal) {
      await fadeWindowOut(nativeModal)
      nativeModal.close()
    }
    this.browserStateMain?.removeModal(id)
  }

  async openModal(url: string, opt: Partial<BrowserWindowOptions>) {
    const [contentWidth, contentHeight] = this.mainWindow.getContentSize()
    if (opt.yFromBottom && opt.y) {
      opt.y = contentHeight - opt.y
    }
    if (opt.xFromRight && opt.x) {
      opt.x = contentWidth - opt.x
    }
    const win = new BrowserWindow({
      ...opt,
      frame: false,
      closable: true,
      movable: false,
      minimizable: false,
      maximizable: false,
      focusable: true,
      skipTaskbar: true,
      opacity: 0,
      hiddenInMissionControl: true,
      parent: this.mainWindow,
      webPreferences: {
        devTools: this.options.debug,
        preload: join(__dirname, '../preload/index.js'),
        // cannot use sandbox and preload script
        sandbox: false,
        webSecurity: true,
        contextIsolation: true,
        nodeIntegration: false
      }
    })
    // apply resolver
    const newUrl = await this.resolveUrl(url)
    win.webContents.loadURL(newUrl)
    win.show()
    await fadeWindowIn(win)
    this.browserStateMain?.addModal(win)
  }

  newTab(
    url?: string,
    _appendTo?: number,
    preferences?: WebPreferences,
    hideNav?: boolean
  ): BrowserView | undefined {
    const view = this.createBrowserView(preferences, hideNav)
    // Add to manager first
    view && this.setCurrentView(view.webContents.id)
    url && this.loadURL(url)
    return view
  }

  createBrowserView(preferences?: WebPreferences, hideNav?: boolean) {
    if (!this.browserStateMain) {
      return undefined
    }
    const view = new BrowserView({
      webPreferences: {
        ...preferences,
        devTools: preferences?.devTools == undefined ? true : preferences.devTools,
        // Set sandbox to support window.opener
        // See: https://github.com/electron/electron/issues/1865#issuecomment-249989894
        sandbox: true,
        nodeIntegration: false,
        contextIsolation: true,
        webSecurity: true,
        navigateOnDragDrop: true,
        safeDialogs: true
      }
    })
    for (const js of this.browserStateMain.state.jsAttached) {
      view.webContents.executeJavaScript(js)
    }
    this.browserStateMain.addView(view, {
      title: this.options.blankTitle,
      hideNavbar: hideNav
    })
    //init handlers
    const id = view.webContents.id
    const webContents = view.webContents
    webContents.setWindowOpenHandler((details) => this.onNewWindow(details))
    // Keep event in order
    webContents
      .on('did-start-loading', () => {
        this.browserStateMain?.setViewById(id, { isLoading: true })
      })
      .on('did-start-navigation', (_, href, _isInPlace, isMainFrame) => {
        if (isMainFrame) {
          this.browserStateMain?.setViewById(id, {
            url: href,
            href,
            errCode: undefined,
            errDesc: undefined,
            certError: undefined
          })
        }
      })
      .on('will-redirect', (_, href, _isInPlace, isMainFrame) => {
        if (isMainFrame) {
          this.browserStateMain?.setViewById(id, {
            url: href,
            href,
            errCode: undefined,
            errDesc: undefined,
            certError: undefined
          })
        } else {
          this.browserStateMain?.setViewById(id, { href })
        }
      })
      .on('page-title-updated', (_, title) => {
        this.browserStateMain?.setViewById(id, { title })
      })
      .on('page-favicon-updated', (_, favicons) => {
        this.browserStateMain?.setViewById(id, { favicon: favicons[0] })
      })
      .on('did-stop-loading', () => {
        this.browserStateMain?.setViewById(id, { isLoading: false })
      })
      .on('certificate-error', (_, _url, error, cert, __, isMainFrame) => {
        if (isMainFrame) {
          this.browserStateMain?.setViewById(id, {
            certError: error,
            cert,
            certErrAt: new Date().getTime()
          })
        }
      })
      .on('media-paused', () => {
        this.browserStateMain?.setViewById(id, { mediaState: 'pause' })
      })
      .on('media-started-playing', () => {
        this.browserStateMain?.setViewById(id, { mediaState: 'play' })
      })
      .on('did-fail-load', (_, errCode, errDesc, __, isMainFrame) => {
        if (isMainFrame) {
          this.browserStateMain?.setViewById(id, { errCode, errDesc, errAt: new Date().getTime() })
        }
      })
      .on('dom-ready', () => {
        webContents.focus()
      })
      .on('context-menu', (e, params) => {
        createContextMenu(this.mainWindow, webContents, {
          showCopyImage: true,
          showCopyImageAddress: true,
          showInspectElement: true,
          showCopyLink: true,
          showCopyVideoAddress: true,
          showLearnSpelling: true,
          showSaveImage: true,
          showLookUpSelection: true,
          showSaveImageAs: true,
          showSaveLinkAs: true,
          showSaveVideo: true,
          showSaveVideoAs: true,
          showSearchWithGoogle: true,
          showServices: true,
          showSelectAll: true,
          popup: {
            window: this.mainWindow,
            x: params.x,
            y: params.y,
            positioningItem: 1
          },
          openUrl: (url: string, newTab: boolean) => {
            if (newTab) {
              this.newTab(url)
            } else {
              this.loadURL(url)
            }
          }
        })(e, params)
      })
      .on('found-in-page', (_, result) => {
        this.browserStateMain?.setFoundResult(result)
      })
    webContents.session
      .on('will-download', (_, item) => {
        this.browserStateMain?.setDownload(item)
        item.once('done', () => {
          this.browserStateMain?.setDownload(item)
        })
        item.on('updated', () => {
          this.browserStateMain?.setDownload(item)
        })
      })
      .setCertificateVerifyProc((request, callback) => {
        this.browserStateMain?.setCertificate(
          request.hostname,
          request.validatedCertificate,
          request.verificationResult as never
        )
        // use verification from chrome
        callback(-3)
      })
    webContents.on('devtools-open-url', (_e, url) => {
      this.newTab(url)
    })
    /*
      webContents.session.webRequest.onHeadersReceived((details, callback) => {
        callback({
          responseHeaders: {
            ...details.responseHeaders,
            'Content-Security-Policy': ['default-src \'none\'']
          }
        })
      })
      */
    return view
  }

  setCurrentView(viewId: number): void {
    const view = this.browserStateMain?.getViewById(viewId)
    const nativeView = this.browserStateMain?.getNativeViewById(viewId)
    if (!view || !nativeView) return
    // remove previous view
    const previousNative = this.browserStateMain?.currentNativeView
    // set new view
    this.browserStateMain?.setCurrentView(viewId)
    this.mainWindow.addBrowserView(nativeView)
    // remove after to avoid flash
    previousNative && this.mainWindow.removeBrowserView(previousNative)
    this.setContentBounds(nativeView, !!view.hideNavbar)
    if (this.options.debug) {
      //view.nativeView.webContents.openDevTools()
    }
    nativeView.setAutoResize({ width: true, height: true })
  }

  async resolveUrl(url: string) {
    try {
      if (!url) return
      // apply resolver
      if (navigationUtils.isEthAddress(url)) {
        const { walletUrl, webSiteUrl } = await navigationUtils.resolveEns(url)
        const result = webSiteUrl ? webSiteUrl : walletUrl
        if (navigationUtils.isEthAddress(result)) {
          const newUrl = navigationUtils.prepareUrlForNavigation(url)
          return newUrl
        } else {
          // call recursively with new url
          return this.resolveUrl(result)
        }
      } else if (navigationUtils.isSolAddress(url)) {
        const newUrl = await navigationUtils.resolveSns(url)
        return newUrl
      } else if (navigationUtils.isIpfs(url)) {
        const newUrl = navigationUtils.resolveIpfs(url)
        return newUrl
      } else if (navigationUtils.isIpns(url)) {
        const newUrl = navigationUtils.resolveIpns(url)
        return newUrl
      } else if (navigationUtils.isUnstoppable(url)) {
        const newUrl = navigationUtils.resolveUnstoppable(url)
        return newUrl
      } else {
        const newUrl = navigationUtils.prepareUrlForNavigation(url)
        return newUrl
      }
    } catch (e) {
      console.error("FAILED:", url, e)
      return navigationUtils.DNS_PROBE_POSSIBLE
    }
  }

  async loadURL(url: string): Promise<void> {
    const view = this.browserStateMain?.currentNativeView
    if (!url || !view) return
    // apply resolver
    const newUrl = await this.resolveUrl(url)
    this.browserStateMain?.setViewById(view.webContents.id, {
      urlAfterResolve: newUrl,
      urlBeforeResolve: url
    })
    view.webContents.loadURL(newUrl)
  }

  setContentBounds(view: BrowserView, hideNavbar: boolean): void {
    const [contentWidth, contentHeight] = this.mainWindow.getContentSize()
    const controlBounds = this.getControlBounds()
    if (hideNavbar) {
      view.setBounds({
        x: 0,
        y: 0,
        width: contentWidth,
        height: contentHeight
      })
    } else {
      view.setBounds({
        x: 0,
        y: 0 + controlBounds.height,
        width: contentWidth,
        height: contentHeight - controlBounds.height
      })
    }
  }

  getControlBounds(): { x: number; y: number; width: number; height: number } {
    const contentBounds = this.mainWindow.getContentBounds()
    return {
      x: 0,
      y: 0,
      width: contentBounds.width,
      height: this.options.controlHeight || 130
    }
  }

  onNewWindow({ url: newUrl }: HandlerDetails):
    | { action: 'deny' }
    | {
        action: 'allow'
        outlivesOpener?: boolean
        overrideBrowserWindowOptions?: BrowserWindowConstructorOptions
      } {
    const id = this.browserStateMain?.currentViewId
    /*
    if (!new URL(newUrl).host) {
      Handle newUrl = 'about:blank' in some cases
      return { action: 'allow' }
    }
    if (disposition === 'new-window') {
      return { action: 'allow' }
    } else if (disposition === 'foreground-tab') {
      this.newTab(newUrl, id)
      return { action: 'deny' }
    } else {
      this.newTab(newUrl, id)
      return { action: 'deny' }
    }*/
    this.newTab(newUrl, id)
    return { action: 'deny' }
  }

  switchTab(viewId: number): void {
    const view = this.browserStateMain?.getNativeViewById(viewId)
    if (view) {
      this.setCurrentView(viewId)
      view?.webContents?.focus()
    }
  }

  closeTab(viewId: number): void {
    const view = this.browserStateMain?.getNativeViewById(viewId)
    if (view) {
      // hack to close video and audio before close
      view.webContents.session.closeAllConnections()
      view.webContents.executeJavaScript(`
      document.querySelectorAll("video").forEach(e => e.remove())
      document.querySelectorAll("audio").forEach(e => e.remove())
      `)
      // remove from view
      this.mainWindow.removeBrowserView(view)
      view.webContents.stop()
      view.webContents.close()
      // remove from state
      this.browserStateMain?.deleteView(viewId)
      // update state
      const nextViewId = this.browserStateMain?.currentViewId
      nextViewId && this.setCurrentView(nextViewId)
    }
  }

  destroyView(viewId: number): void {
    const view = this.browserStateMain?.getNativeViewById(viewId)
    if (view) {
      view.webContents.close()
    }
  }
  onWindowFocus() {
    const forceReload = () => {
      this.browserStateMain?.currentNativeView?.webContents?.reloadIgnoringCache()
    }
    globalShortcut.register('CommandOrControl+R', forceReload)
    globalShortcut.register('F5', forceReload)
  }
  onWindowBlur() {
    globalShortcut.unregister('CommandOrControl+R')
    globalShortcut.unregister('F5')
  }
}
