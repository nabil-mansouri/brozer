/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IpcRenderer } from 'electron'
import {
  BrowserState,
  BrowserStateWithListener,
  BrowserStateListener,
  STATE_CHANNEL
} from '../common/browser_state_interface'

export class BrowserStateRenderer implements BrowserStateWithListener {
  listeners: BrowserStateListener[] = []
  constructor(private ipcRenderer: IpcRenderer) {
    this.ipcRenderer.on(STATE_CHANNEL, (_, args) => {
      this.onStateChange(BrowserState.decode(args))
    })
  }
  listen = (listener: BrowserStateListener) => {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }
  onStateChange = (state: BrowserState) => {
    for (const listener of this.listeners) {
      listener.onStateChange(state)
    }
  }
  getState = (): Promise<BrowserState> => {
    return new Promise((resolve) => {
      this.ipcRenderer.once(STATE_CHANNEL, (_, arg) => {
        resolve(BrowserState.decode(arg))
      })
      this.ipcRenderer.send(STATE_CHANNEL)
    })
  }
}
