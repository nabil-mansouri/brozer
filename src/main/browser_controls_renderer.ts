/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CertificateTrustDialogOptions,
  FindInPageOptions,
  ipcRenderer,
  OpenDialogOptions,
  SaveDialogOptions
} from 'electron'
import { Writer } from 'protobufjs'
import {
  BrowserControlMessage,
  BrowserControlResponse,
  BrowserControlsInterface,
  BrowserWindowOptions,
  CONTROL_CHANNEL
} from '../common/browser_controls_interface'

export class BrowserControlsRenderer implements BrowserControlsInterface {
  doSend = (channel: string, writer: Writer) => {
    ipcRenderer.send(channel, writer.finish())
  }
  onGoBack = () => {
    this.doSend(
      CONTROL_CHANNEL,
      BrowserControlMessage.encode({ msg: { $case: 'onAction', onAction: { action: 'GOBACK' } } })
    )
  }
  onGoForward = () => {
    this.doSend(
      CONTROL_CHANNEL,
      BrowserControlMessage.encode({
        msg: { $case: 'onAction', onAction: { action: 'GOFORWARD' } }
      })
    )
  }
  onStop = () => {
    this.doSend(
      CONTROL_CHANNEL,
      BrowserControlMessage.encode({ msg: { $case: 'onAction', onAction: { action: 'STOP' } } })
    )
  }
  onReload = (force: boolean) => {
    this.doSend(
      CONTROL_CHANNEL,
      BrowserControlMessage.encode({
        msg: { $case: 'onAction', onAction: { action: force ? 'FORCE_RELOAD' : 'RELOAD' } }
      })
    )
  }
  onControlReady = (options: { jsAttached: string[] }) => {
    this.doSend(
      CONTROL_CHANNEL,
      BrowserControlMessage.encode({ msg: { $case: 'onControlReady', onControlReady: options } })
    )
  }
  onUrlChange = (url: string) => {
    this.doSend(
      CONTROL_CHANNEL,
      BrowserControlMessage.encode({ msg: { $case: 'onUrlChange', onUrlChange: { url } } })
    )
  }
  onUrlEnter = (url: string) => {
    this.doSend(
      CONTROL_CHANNEL,
      BrowserControlMessage.encode({ msg: { $case: 'onUrlEnter', onUrlEnter: { url } } })
    )
  }
  onNewTab = (url: string, ifNoViews: boolean, preferences: Electron.WebPreferences, hideNav: boolean) => {
    this.doSend(
      CONTROL_CHANNEL,
      BrowserControlMessage.encode({
        msg: { $case: 'onNewTab', onNewTab: { url, ifNoViews, ...preferences, hideNavbar: hideNav } }
      })
    )
  }
  onSwitchTab = (id: number) => {
    this.doSend(
      CONTROL_CHANNEL,
      BrowserControlMessage.encode({ msg: { $case: 'onSwitchTab', onSwitchTab: { id } } })
    )
  }
  onCloseTab = (id: number) => {
    this.doSend(
      CONTROL_CHANNEL,
      BrowserControlMessage.encode({ msg: { $case: 'onCloseTab', onCloseTab: { id } } })
    )
  }
  onToggleMaximize = () => {
    this.doSend(
      CONTROL_CHANNEL,
      BrowserControlMessage.encode({
        msg: { $case: 'onAction', onAction: { action: 'TOGGLE_MAXIMIZE' } }
      })
    )
  }
  onMaximize = () => {
    this.doSend(
      CONTROL_CHANNEL,
      BrowserControlMessage.encode({ msg: { $case: 'onAction', onAction: { action: 'MAXIMIZE' } } })
    )
  }
  onMinimize = () => {
    this.doSend(
      CONTROL_CHANNEL,
      BrowserControlMessage.encode({ msg: { $case: 'onAction', onAction: { action: 'MINIMIZE' } } })
    )
  }
  onToggleDevTools = () => {
    this.doSend(
      CONTROL_CHANNEL,
      BrowserControlMessage.encode({
        msg: { $case: 'onAction', onAction: { action: 'TOGGLE_DEVTOOLS' } }
      })
    )
  }
  onZoomIn = () => {
    this.doSend(
      CONTROL_CHANNEL,
      BrowserControlMessage.encode({ msg: { $case: 'onAction', onAction: { action: 'ZOOM_IN' } } })
    )
  }
  onZoomOut = () => {
    this.doSend(
      CONTROL_CHANNEL,
      BrowserControlMessage.encode({ msg: { $case: 'onAction', onAction: { action: 'ZOOM_OUT' } } })
    )
  }
  onZoomReset = () => {
    this.doSend(
      CONTROL_CHANNEL,
      BrowserControlMessage.encode({
        msg: { $case: 'onAction', onAction: { action: 'RESET_ZOOM' } }
      })
    )
  }
  onPrint = ({
    collate,
    color,
    copies,
    deviceName,
    footer,
    header,
    landscape,
    pagesPerSheet,
    printBackground,
    scaleFactor,
    silent
  }: Electron.WebContentsPrintOptions = {}) => {
    this.doSend(
      CONTROL_CHANNEL,
      BrowserControlMessage.encode({
        msg: {
          $case: 'onPrint',
          onPrint: {
            collate,
            color,
            copies,
            deviceName,
            footer,
            header,
            landscape,
            pagesPerSheet,
            printBackground,
            scaleFactor,
            silent
          }
        }
      })
    )
  }
  onCapture = (options: { path?: string }): Promise<BrowserControlResponse> => {
    return new Promise((resolve) => {
      const responseChannel = `${CONTROL_CHANNEL}/onCapture/${new Date().getTime()}`
      ipcRenderer.once(responseChannel, (_, arg) => {
        resolve(BrowserControlResponse.decode(arg))
      })
      this.doSend(
        CONTROL_CHANNEL,
        BrowserControlMessage.encode({
          responseChannel,
          msg: { $case: 'onCapture', onCapture: { ...options } }
        })
      )
    })
  }
  onSavePage = (fullPath: string, saveType: 'HTMLOnly' | 'HTMLComplete' | 'MHTML') => {
    this.doSend(
      CONTROL_CHANNEL,
      BrowserControlMessage.encode({
        msg: { $case: 'onSave', onSave: { fullPath, saveType } }
      })
    )
  }
  onShowSaveDialog = (options: SaveDialogOptions): Promise<BrowserControlResponse> => {
    return new Promise((resolve) => {
      const responseChannel = `${CONTROL_CHANNEL}/onSaveDialog/${new Date().getTime()}`
      ipcRenderer.once(responseChannel, (_, arg) => {
        resolve(BrowserControlResponse.decode(arg))
      })
      this.doSend(
        CONTROL_CHANNEL,
        BrowserControlMessage.encode(
          BrowserControlMessage.create({
            responseChannel,
            msg: { $case: 'onSaveDialog', onSaveDialog: { ...options } }
          })
        )
      )
    })
  }
  onShowOpenDialog = (options: OpenDialogOptions): Promise<BrowserControlResponse> => {
    return new Promise((resolve) => {
      const responseChannel = `${CONTROL_CHANNEL}/onOpenDialog/${new Date().getTime()}`
      ipcRenderer.once(responseChannel, (_, arg) => {
        resolve(BrowserControlResponse.decode(arg))
      })
      this.doSend(
        CONTROL_CHANNEL,
        BrowserControlMessage.encode(
          BrowserControlMessage.create({
            responseChannel,
            msg: { $case: 'onOpenDialog', onOpenDialog: { ...options } }
          })
        )
      )
    })
  }
  onShowCertificateDialog = (
    options: CertificateTrustDialogOptions
  ): Promise<BrowserControlResponse> => {
    return new Promise((resolve) => {
      const responseChannel = `${CONTROL_CHANNEL}/onShowCertDialog/${new Date().getTime()}`
      ipcRenderer.once(responseChannel, (_, r) => {
        resolve(BrowserControlResponse.decode(r))
      })
      this.doSend(
        CONTROL_CHANNEL,
        BrowserControlMessage.encode({
          responseChannel,
          msg: { $case: 'onShowCertDialog', onShowCertDialog: { ...options } }
        })
      )
    })
  }
  onSetAudioMuted = (muted: boolean) => {
    this.doSend(
      CONTROL_CHANNEL,
      BrowserControlMessage.encode({
        msg: { $case: 'onAudio', onAudio: { muted } }
      })
    )
  }
  onSetContent = (options: {
    relativeFile?: string
    absoluteFile?: string
    httpFile?: string
  }): void => {
    this.doSend(
      CONTROL_CHANNEL,
      BrowserControlMessage.encode({
        msg: { $case: 'onContent', onContent: { ...options } }
      })
    )
  }
  onUpdateDownload = (id: string, action: 'pause' | 'interrupt'): void => {
    this.doSend(
      CONTROL_CHANNEL,
      BrowserControlMessage.encode({
        msg: { $case: 'onDownload', onDownload: { id, action } }
      })
    )
  }
  onFindPage = (
    searchText: string,
    options?: FindInPageOptions
  ): Promise<BrowserControlResponse> => {
    return new Promise((resolve) => {
      const responseChannel = `${CONTROL_CHANNEL}/onFind/${new Date().getTime()}`
      ipcRenderer.once(responseChannel, (_, r) => {
        resolve(BrowserControlResponse.decode(r))
      })
      this.doSend(
        CONTROL_CHANNEL,
        BrowserControlMessage.encode({
          responseChannel,
          msg: { $case: 'onFind', onFind: { searchText, ...options } }
        })
      )
    })
  }

  onStopFindPage = (action: 'clearSelection' | 'keepSelection' | 'activateSelection'): void => {
    this.doSend(
      CONTROL_CHANNEL,
      BrowserControlMessage.encode({
        msg: { $case: 'onStopFind', onStopFind: { action } }
      })
    )
  }

  onOpenModal = (url: string, opt: Partial<BrowserWindowOptions>): void => {
    this.doSend(
      CONTROL_CHANNEL,
      BrowserControlMessage.encode({
        msg: { $case: 'onNewModal', onNewModal: { url, ...opt } }
      })
    )
  }
  onModalClose = (id: number): void => {
    this.doSend(
      CONTROL_CHANNEL,
      BrowserControlMessage.encode({
        msg: { $case: 'onCloseModal', onCloseModal: id }
      })
    )
  }
  onModalUpdate = (
    id: number,
    url: string,
    opt: Partial<BrowserWindowOptions>
  ): void => {
    this.doSend(
      CONTROL_CHANNEL,
      BrowserControlMessage.encode({
        msg: { $case: 'onUpdateModal', onUpdateModal: { id, opts: { url, ...opt } } }
      })
    )
  }
}
