import { ipcMain, IpcMainEvent } from 'electron'

type Listener = (event: IpcMainEvent, ...args: unknown[]) => void
export abstract class IPCMainBind {
  protected unbindCallback: Array<() => void> = []
  protected lastMainEvent?: IpcMainEvent

  bind(): void {
    const keys = Object.keys(this)

    for (const key of keys) {
      if (key.startsWith('on')) {
        const listener: Listener = (e, ...args) => {
          if (this.getSenderId() && e.sender) {
            this.lastMainEvent = e
            this[key](...args)
            this.lastMainEvent = undefined
          }
        }
        ipcMain.on(key, listener)
        this.unbindCallback.push(() => {
          ipcMain.removeListener(key, listener)
        })
      }
    }
  }
  unbind(): void {
    for (const callback of this.unbindCallback) {
      callback()
    }
    this.unbindCallback = []
  }

  abstract getSenderId()
}
