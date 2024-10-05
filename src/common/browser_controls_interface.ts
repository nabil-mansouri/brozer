import {
  BrowserWindowConstructorOptions,
  CertificateTrustDialogOptions,
  FindInPageOptions,
  OpenDialogOptions,
  SaveDialogOptions,
  WebContentsPrintOptions,
  WebPreferences
} from 'electron'
import { BrowserControlResponse } from './browser_controls_interface'
export * from '../generated/proto/browser'
export const CONTROL_CHANNEL = 'ipc://channel/control'
export interface BrowserControlsInterface {
  onControlReady(options: { jsAttached: string[] }): void
  onUrlChange(url: string): void
  onUrlEnter(url: string): void
  onNewTab(url: string, ifNoViews: boolean, preferences: WebPreferences, hideNav: boolean): void
  onSwitchTab(id: number): void
  onCloseTab(id: number): void
  onGoBack(): void
  onGoForward(): void
  onStop(): void
  onReload(force: boolean): void
  onToggleMaximize(): void
  onMaximize(): void
  onMinimize(): void
  onToggleDevTools(): void
  onZoomIn(): void
  onZoomOut(): void
  onZoomReset(): void
  onPrint(preferences?: WebContentsPrintOptions): void
  onSavePage(fullPath: string, saveType: 'HTMLOnly' | 'HTMLComplete' | 'MHTML'): void
  onCapture(options: { path?: string }): Promise<BrowserControlResponse>
  onShowSaveDialog(options: SaveDialogOptions): Promise<BrowserControlResponse>
  onShowOpenDialog(options: OpenDialogOptions): Promise<BrowserControlResponse>
  onShowCertificateDialog(options: CertificateTrustDialogOptions): Promise<BrowserControlResponse>
  onSetAudioMuted(muted: boolean): void
  onSetContent(options: { relativeFile?: string; absoluteFile?: string; httpFile?: string }): void
  onUpdateDownload(id: string, action: 'pause' | 'interrupt' | 'resume'): void
  onFindPage(text: string, options?: FindInPageOptions): Promise<BrowserControlResponse>
  onStopFindPage(action: 'clearSelection' | 'keepSelection' | 'activateSelection'): void
  onOpenModal(url: string, opt: Partial<BrowserWindowOptions>): void
  onModalUpdate(id: number, url: string, opt: Partial<BrowserWindowOptions>): void
  onModalClose(id: number): void
}

export type BrowserWindowOptions = BrowserWindowConstructorOptions & {
  xFromRight?: boolean
  yFromBottom?: boolean
}
