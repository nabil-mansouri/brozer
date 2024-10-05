import { BrowserState } from '../generated/proto/browser'
export * from '../generated/proto/browser'
export const STATE_CHANNEL = 'ipc://channel/state'
export interface BrowserStateListener {
  getState(): Promise<BrowserState>
  onStateChange(state: BrowserState): void
}

export interface BrowserStateWithListener extends BrowserStateListener {
  listen(listener: BrowserStateListener): () => void
}
