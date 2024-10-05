import {
  BrowserView,
  BrowserWindow,
  Certificate,
  DownloadItem,
  IpcMainEvent,
  Result
} from 'electron'
import {
  BrowserStateListener,
  BrowserState,
  BrowserStateView,
  BrowserFile,
  BrowserFile_State,
  STATE_CHANNEL,
  BrowserStateView_CertStatus,
  BrowserWindowInfo
} from '../common/browser_state_interface'
import x509 from 'x509.js'
import { debounce } from 'debounce'

export type { BrowserState }
export class BrowserStateMain implements BrowserStateListener {
  private _nativeViews = new Map<number, BrowserView>()
  private _nativeWindows = new Map<number, BrowserWindow>()
  private _downloadNativeViews = new Map<string, DownloadItem>()
  private _state: BrowserState = {
    views: [],
    jsAttached: [],
    downloads: [],
    windows: [],
    currentViewId: undefined,
    foundResult: undefined
  }
  private _debouncedStateListener: (state: BrowserState) => void
  constructor(private ipc: IpcMainEvent, { jsAttached }: { jsAttached: string[] }) {
    this._state.jsAttached = [...jsAttached]
    this._debouncedStateListener = debounce((state: BrowserState) => {
      state.windows = this.windowsInfo.map((win) => {
        const nativeWindows = this._nativeWindows.get(win.id)
        if (nativeWindows) {
          const newView: BrowserWindowInfo = {
            ...win,
            isModal: nativeWindows.isModal(),
            isVisible: nativeWindows.isVisible(),
            isFocused: nativeWindows.isFocused(),
            url: nativeWindows.webContents.getURL()
          }
          return newView
        } else {
          console.warn('[onStateChange] Could not found window:', win.id)
          return win
        }
      })
      state.views = this.views.map((e) => {
        const webContent = this._nativeViews.get(e.viewId)?.webContents
        if (webContent) {
          const newView: BrowserStateView = {
            ...e,
            isCrashed: webContent.isCrashed(),
            canGoForward: webContent.canGoForward(),
            canGoBack: webContent.canGoBack(),
            isAudible: webContent.isCurrentlyAudible(),
            isMuted: webContent.isAudioMuted(),
            isLoading: webContent.isLoading()
          }
          return newView
        } else {
          console.warn('[onStateChange] Could not found webcontent:', e.viewId)
          return e
        }
      })
      const writer = BrowserState.encode(state)
      this.ipc.reply(STATE_CHANNEL, writer.finish())
    }, 30)
  }

  /** GETTER */
  get nativeWindows() {
    return this._nativeWindows
  }
  get nativeViews() {
    return this._nativeViews
  }
  get state(): BrowserState {
    return this._state
  }
  get currentView(): BrowserStateView | undefined {
    return this.getViewById(this.currentViewId!)
  }
  get currentNativeView(): BrowserView | undefined {
    return this._nativeViews.get(this.currentViewId!)
  }
  get views(): BrowserStateView[] {
    return this.state.views
  }
  get downloads(): BrowserFile[] {
    return this.state.downloads
  }
  get currentViewId(): number | undefined {
    return this.state.currentViewId
  }
  get windowsInfo(): BrowserWindowInfo[] {
    return this.state.windows
  }
  getNativeModalById(id: number): BrowserWindow | undefined {
    return this._nativeWindows.get(id)
  }
  getModalById(id: number): BrowserWindowInfo | undefined {
    return this._state.windows.find(e => e.id === id)
  }

  getViewById(id: number): BrowserStateView | undefined {
    return this.views.find((view) => view.viewId === id)
  }

  getNativeViewById(id: number): BrowserView | undefined {
    return this._nativeViews.get(id)
  }

  getViewIndexById(id: number): number {
    return this.views.findIndex((view) => view.viewId === id)
  }

  getDownloadIndexById(id: string): number {
    return this.downloads.findIndex((view) => view.id === id)
  }

  getDownloadById(id: string): BrowserFile | undefined {
    return this.downloads.find((view) => view.id === id)
  }
  getDownloadNativeById(id: string): DownloadItem | undefined {
    return this._downloadNativeViews.get(id)
  }

  /** MODIFIER */
  attachJs(js: string): void {
    this._state.jsAttached.push(js)
    this.onStateChange(this._state)
  }

  addView(nativeView: BrowserView, data: Partial<BrowserStateView>): BrowserStateView {
    const viewId = nativeView.webContents.id
    const newView: BrowserStateView = {
      canGoBack: false,
      canGoForward: false,
      favicon: '',
      href: '',
      isLoading: false,
      title: '',
      url: '',
      host: '',
      viewId,
      ...data
    }
    this._state.views.push(newView)
    this._nativeViews.set(viewId, nativeView)
    this.onStateChange(this.state)
    return newView
  }

  setCertificate(
    hostname: string,
    certificate: Certificate,
    status: 'net::OK' | 'net::CERT_REVOKED'
  ): void {
    const view = this.currentView
    if (view) {
      if (view.host === hostname) {
        view.cert = certificate
        view.certDetails = x509.parseCert(view.cert.data)
        view.certStatus = status.includes('OK')
          ? BrowserStateView_CertStatus.OK
          : BrowserStateView_CertStatus.CERT_REVOKED
        this.onStateChange(this._state)
      }
    }
  }

  setDownload(download: DownloadItem): void {
    const id = `${download.getStartTime()}:${download.getURL()}`
    const index = this.getDownloadIndexById(id)
    const item: BrowserFile = {
      id,
      fileName: download.getFilename(),
      filePath: download.getSavePath(),
      mimeType: download.getMimeType(),
      paused: download.isPaused(),
      receivedBytes: download.getReceivedBytes(),
      startTime: download.getStartTime(),
      lastUpdate: download.getLastModifiedTime(),
      state: download.getState(),
      totalBytes: download.getTotalBytes(),
      url: download.getURL()
    }
    if (item.state === BrowserFile_State.progressing) {
      this._downloadNativeViews.set(id, download)
    } else {
      this._downloadNativeViews.delete(id)
    }
    if (index === -1) {
      this._state.downloads.push(item)
    } else {
      this._state.downloads[index] = item
    }
    this.onStateChange(this.state)
  }

  setViewById(viewId: number, data: Partial<BrowserStateView>): BrowserStateView | undefined {
    const index = this.getViewIndexById(viewId)
    if (index > -1) {
      const newView = { ...this._state.views[index], ...data }
      if (newView.url) {
        const oldHost = newView.host
        const newHost = new URL(newView.url).hostname
        if (oldHost != newHost) {
          newView.host = newHost
          newView.cert = undefined
          newView.certDetails = undefined
          newView.certStatus = undefined
        }
      }
      this._state.views[index] = newView
      this.onStateChange(this.state)
      return this._state[index]
    }
    return undefined
  }

  addModal(win: BrowserWindow): BrowserWindowInfo {
    const info: BrowserWindowInfo = {
      id: win.id,
      isModal: win.isModal(),
      isVisible: win.isVisible(),
      isFocused: win.isFocused(),
      url: win.webContents.getURL()
    }
    this._nativeWindows.set(win.id, win)
    this._state.windows.push(info)
    this.onStateChange(this._state)
    return info
  }

  removeModal(id: number): BrowserWindowInfo | undefined {
    const info = this.getModalById(id)
    this._nativeWindows.delete(id)
    this._state.windows = this._state.windows.filter(e => e.id !== id)
    this.onStateChange(this._state)
    return info
  }

  setCurrentView(viewId: number): void {
    this._state.currentViewId = viewId
    this.onStateChange(this.state)
  }

  deleteView(viewId: number): void {
    const index = this.getViewIndexById(viewId)
    const previous = this._state.views[index - 1]
    const next = this._state.views[index + 1]
    this._nativeViews.delete(viewId)
    this._state.views = this._state.views.filter((e) => {
      return e.viewId !== viewId
    })
    const last = this._state.views[this._state.views.length - 1]
    if (previous) {
      this._state.currentViewId = previous.viewId
    } else if (next) {
      this._state.currentViewId = next.viewId
    } else if (last) {
      this._state.currentViewId = last.viewId
    } else {
      this._state.currentViewId = undefined
    }
    this.onStateChange(this.state)
  }
  setFoundResult(result: Result): void {
    this._state.foundResult = result
    this.onStateChange(this._state)
  }
  clearFoundResult(): void {
    this._state.foundResult = undefined
    this.onStateChange(this._state)
  }
  /** PUBLIC API */

  getState(): Promise<BrowserState> {
    this.ipc.reply(STATE_CHANNEL, this.state)
    return Promise.resolve(this.state)
  }

  triggerOnStateChange(): void {
    this._debouncedStateListener(this._state)
  }

  onStateChange(state: BrowserState): void {
    this._debouncedStateListener(state)
  }
}
