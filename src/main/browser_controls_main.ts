/* eslint-disable @typescript-eslint/explicit-function-return-type */
import fs from 'fs'
import {
  BrowserView,
  CertificateTrustDialogOptions,
  dialog,
  FindInPageOptions,
  ipcMain,
  IpcMainEvent,
  OpenDialogOptions,
  SaveDialogOptions,
  screen,
  WebContentsPrintOptions,
  WebPreferences
} from 'electron'
import { Browser } from './browser'
import {
  BrowserControlMessage,
  BrowserControlResponse,
  BrowserControlsInterface,
  BrowserWindowOptions,
  CONTROL_CHANNEL
} from '../common/browser_controls_interface'
import { BrowserStateMain } from './browser_state_main'
import { join } from 'path'

type Listener = (event: IpcMainEvent, ...args: unknown[]) => void

export class BrowserControlsMain implements BrowserControlsInterface {
  constructor(private browser: Browser) {}
  protected unbindCallback: Array<() => void> = []
  protected lastMainEvent?: IpcMainEvent
  protected channelResponse?: string

  bind(): void {
    const listener: Listener = (e, args) => {
      if (this.getSenderId() === e.sender.id) {
        this.lastMainEvent = e
        const message = BrowserControlMessage.decode(args as any)
        this.channelResponse = message.responseChannel
        switch (message.msg?.$case) {
          case 'onAction': {
            switch (message.msg.onAction.action) {
              case 'GOBACK':
                this.onGoBack()
                break
              case 'GOFORWARD':
                this.onGoForward()
                break
              case 'STOP':
                this.onStop()
                break
              case 'RELOAD':
                this.onReload(false)
                break
              case 'FORCE_RELOAD':
                this.onReload(true)
                break
              case 'TOGGLE_MAXIMIZE':
                this.onToggleMaximize()
                break
              case 'MAXIMIZE':
                this.onMaximize()
                break
              case 'MINIMIZE':
                this.onMinimize()
                break
              case 'TOGGLE_DEVTOOLS':
                // NOT OK
                this.onToggleDevTools()
                break
              case 'ZOOM_IN':
                this.onZoomIn()
                break
              case 'ZOOM_OUT':
                this.onZoomOut()
                break
              case 'RESET_ZOOM':
                this.onZoomReset()
                break
              default:
                throw new Error(`Unhandled action case: ${message.msg.onAction.action}`)
            }
            break
          }
          case 'onAudio':
            this.onSetAudioMuted(message.msg.onAudio.muted)
            break
          case 'onCapture':
            this.onCapture(message.msg.onCapture)
            break
          case 'onCloseTab':
            this.onCloseTab(message.msg.onCloseTab.id)
            break
          case 'onContent':
            this.onSetContent(message.msg.onContent)
            break
          case 'onControlReady':
            this.onControlReady(message.msg.onControlReady)
            break
          case 'onDownload':
            this.onUpdateDownload(message.msg.onDownload.id, message.msg.onDownload.action)
            break
          case 'onFind':
            this.onFindPage(message.msg.onFind.searchText, message.msg.onFind)
            break
          case 'onNewTab':
            this.onNewTab(
              message.msg.onNewTab.url,
              message.msg.onNewTab.ifNoViews || false,
              message.msg.onNewTab,
              !!message.msg.onNewTab.hideNavbar
            )
            break
          case 'onOpenDialog':
            this.onShowOpenDialog(message.msg.onOpenDialog)
            break
          case 'onPrint':
            this.onPrint(message.msg.onPrint)
            break
          case 'onSave':
            this.onSavePage(message.msg.onSave.fullPath, message.msg.onSave.saveType)
            break
          case 'onSaveDialog':
            this.onShowSaveDialog(message.msg.onSaveDialog)
            break
          case 'onShowCertDialog':
            this.onShowCertificateDialog(
              message.msg.onShowCertDialog as CertificateTrustDialogOptions
            )
            break
          case 'onStopFind':
            this.onStopFindPage(message.msg.onStopFind.action)
            break
          case 'onSwitchTab':
            this.onSwitchTab(message.msg.onSwitchTab.id)
            break
          case 'onUrlChange':
            this.onUrlChange(message.msg.onUrlChange.url)
            break
          case 'onUrlEnter':
            this.onUrlEnter(message.msg.onUrlEnter.url)
            break
          case 'onNewModal':
            this.onOpenModal(message.msg.onNewModal.url, message.msg.onNewModal)
            break
          case 'onUpdateModal':
            this.onModalUpdate(
              message.msg.onUpdateModal.id,
              message.msg.onUpdateModal.opts?.url,
              message.msg.onUpdateModal.opts
            )
            break
          case 'onCloseModal':
            this.onModalClose(message.msg.onCloseModal)
            break
          default:
            throw new Error(`Unhandled control case: ${message.msg}`)
        }
        this.lastMainEvent = undefined
      }
    }
    ipcMain.on(CONTROL_CHANNEL, listener)
    this.unbindCallback.push(() => {
      ipcMain.removeListener(CONTROL_CHANNEL, listener)
    })
  }
  unbind(): void {
    for (const callback of this.unbindCallback) {
      callback()
    }
    this.unbindCallback = []
  }

  doReply(res: BrowserControlResponse, last?: IpcMainEvent, channel?: string) {
    last?.reply(channel, BrowserControlResponse.encode(res!).finish())
    return res
  }

  get nativeView(): BrowserView | undefined {
    return this.browser.browserStateMain?.currentNativeView
  }

  getSenderId(): number {
    return this.browser.mainWindow.webContents.id
  }

  onGoBack() {
    this.nativeView?.webContents?.goBack()
  }
  onGoForward() {
    this.nativeView?.webContents?.goForward()
  }
  onStop() {
    this.nativeView?.webContents?.stop()
  }
  onReload(force: boolean) {
    if (force) {
      this.nativeView?.webContents?.reloadIgnoringCache()
    } else {
      this.nativeView?.webContents?.reload()
    }
  }
  onControlReady(options: { jsAttached: string[] }) {
    // dont set if already ready
    if (!this.browser.browserStateMain) {
      this.browser.browserStateMain = new BrowserStateMain(this.lastMainEvent!, options)
    }
  }
  onUrlChange(_url: string) {
    // dont need to change anything
  }
  onUrlEnter(url: string) {
    this.browser.loadURL(url)
  }
  onNewTab(url: string, ifNoViews: boolean, preferences: WebPreferences, hideNav: boolean) {
    if (ifNoViews) {
      if (this.browser.browserStateMain && this.browser.browserStateMain.views.length > 0) {
        this.browser.browserStateMain.triggerOnStateChange()
        return
      }
    }
    this.browser.newTab(url, undefined, preferences, hideNav)
  }
  onSwitchTab(id: number) {
    this.browser.switchTab(id)
  }
  onCloseTab(id: number) {
    this.browser.closeTab(id)
  }
  onToggleMaximize() {
    if (this.browser.mainWindow.isMaximized()) {
      const { width } = screen.getPrimaryDisplay().workAreaSize
      const { height } = this.browser.mainWindow.getBounds()
      this.browser.mainWindow.setSize(width / 2, height, true)
    } else {
      this.browser.mainWindow.maximize()
    }
  }
  onMaximize() {
    this.browser.mainWindow.maximize()
  }
  onMinimize() {
    this.browser.mainWindow.minimize()
  }
  onToggleDevTools() {
    this.nativeView?.webContents?.toggleDevTools()
  }
  onZoomIn() {
    const webContent = this.nativeView?.webContents
    if (webContent) {
      const newFactor = webContent.zoomFactor - 0.1
      if (newFactor > 0.1) {
        webContent.setZoomFactor(newFactor)
      }
    }
  }
  onZoomOut() {
    const webContent = this.nativeView?.webContents
    if (webContent) {
      const newFactor = webContent.zoomFactor + 0.1
      if (newFactor <= 5) {
        webContent.setZoomFactor(newFactor)
      }
    }
  }
  onZoomReset() {
    this.nativeView?.webContents?.setZoomFactor(1)
  }
  async onCapture({ path }: { path?: string }): Promise<BrowserControlResponse> {
    // get last event now because async
    const last = this.lastMainEvent
    const replyChannel = this.channelResponse
    const image = await this.nativeView?.webContents?.capturePage()
    if (path && image) {
      await fs.promises.writeFile(path, image.toPNG())
    }
    const url = image?.toDataURL() || ''
    const result: BrowserControlResponse = { msg: { $case: 'onCapture', onCapture: { url } } }
    return this.doReply(result, last, replyChannel)
  }
  onPrint(preferences?: WebContentsPrintOptions) {
    this.nativeView?.webContents?.print(preferences)
  }
  onSavePage(fullpath: string, type: 'HTMLOnly' | 'HTMLComplete' | 'MHTML') {
    this.nativeView?.webContents?.savePage(fullpath, type)
  }
  async onShowSaveDialog(options: SaveDialogOptions): Promise<BrowserControlResponse> {
    // get last event now because async
    const last = this.lastMainEvent
    const replyChannel = this.channelResponse
    const res = await dialog.showSaveDialog(this.browser.mainWindow, options)
    const result: BrowserControlResponse = { msg: { $case: 'onSaveDialog', onSaveDialog: res } }
    return this.doReply(result, last, replyChannel)
  }
  async onShowOpenDialog(options: OpenDialogOptions): Promise<BrowserControlResponse> {
    // get last event now because async
    const last = this.lastMainEvent
    const replyChannel = this.channelResponse
    const { bookmarks = [], ...other } = await dialog.showOpenDialog(
      this.browser.mainWindow,
      options
    )
    const result: BrowserControlResponse = {
      msg: { $case: 'onOpenDialog', onOpenDialog: { ...other, bookmarks } }
    }
    return this.doReply(result, last, replyChannel)
  }
  async onShowCertificateDialog(
    options: CertificateTrustDialogOptions
  ): Promise<BrowserControlResponse> {
    // get last event now because async
    const last = this.lastMainEvent
    const replyChannel = this.channelResponse
    await dialog.showCertificateTrustDialog(this.browser.mainWindow, options)
    const result: BrowserControlResponse = {
      msg: { $case: 'onShowCertificate', onShowCertificate: true }
    }
    return this.doReply(result, last, replyChannel)
  }
  onSetAudioMuted(muted: boolean) {
    this.nativeView?.webContents?.setAudioMuted(muted)
  }
  onSetContent({
    absoluteFile,
    httpFile,
    relativeFile
  }: {
    relativeFile?: string
    absoluteFile?: string
    httpFile?: string
  }): void {
    if (absoluteFile) {
      this.nativeView?.webContents?.loadFile(absoluteFile)
    } else if (relativeFile) {
      this.nativeView?.webContents?.loadFile(join(__dirname, relativeFile))
    } else if (httpFile) {
      this.nativeView?.webContents?.loadURL(httpFile)
    }
  }
  onUpdateDownload(id: string, action: 'pause' | 'interrupt' | 'resume'): void {
    const nativeItem = this.browser.browserStateMain?.getDownloadNativeById(id)
    if (nativeItem) {
      if (action === 'pause' && !nativeItem.isPaused()) {
        nativeItem.pause()
      } else if (action === 'resume' && nativeItem.canResume()) {
        nativeItem.resume()
      } else if (action === 'interrupt' && nativeItem.getState() === 'progressing') {
        nativeItem.cancel()
      }
    }
  }
  async onFindPage(text: string, options?: FindInPageOptions): Promise<BrowserControlResponse> {
    const last = this.lastMainEvent
    const replyChannel = this.channelResponse
    const requestId = this.nativeView?.webContents?.findInPage(text, options)
    const result: BrowserControlResponse = {
      msg: { $case: 'onFind', onFind: { requestId } }
    }
    return this.doReply(result, last, replyChannel)
  }

  onStopFindPage(action: 'clearSelection' | 'keepSelection' | 'activateSelection'): void {
    this.nativeView?.webContents?.stopFindInPage(action)
    this.browser.browserStateMain?.clearFoundResult()
  }

  onOpenModal(url: string, opt: Partial<BrowserWindowOptions>): void {
    this.browser.openModal(url, opt)
  }

  onModalClose(id: number): void {
    this.browser.closeModal(id)
  }

  onModalUpdate(
    id: number,
    url?: string,
    opt: Partial<BrowserWindowOptions> = {}
  ): void {
    const modal = this.browser.browserStateMain?.getNativeModalById(id)
    if (modal) {
      const { x, y, height, width, center, alwaysOnTop, opacity, show, hasShadow, backgroundColor } = opt
      if (x != undefined && y != undefined && width != undefined && height != undefined) {
        modal.setBounds({ height, width, x, y }, true)
      }
      if (center !== undefined) {
        modal.center()
      }
      if (alwaysOnTop !== undefined) {
        modal.setAlwaysOnTop(alwaysOnTop)
      }
      if (opacity !== undefined) {
        modal.setOpacity(opacity)
      }
      if (hasShadow !== undefined) {
        modal.setHasShadow(hasShadow)
      }
      if (backgroundColor !== undefined) {
        modal.setBackgroundColor(backgroundColor)
      }
      if (show !== undefined) {
        if (show) {
          modal.show()
        } else {
          modal.hide()
        }
      }
      if (url !== undefined && url) {
        modal.loadURL(url)
      }
      this.browser.browserStateMain?.triggerOnStateChange()
    }
  }
}
