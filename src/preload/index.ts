import { contextBridge, ipcRenderer } from 'electron'
//import { electronAPI } from '@electron-toolkit/preload'

import { BrowserControlsRenderer } from '../main/browser_controls_renderer'
import { BrowserStateRenderer } from '../main/browser_state_renderer'

// Custom APIs for renderer
/*const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
*/

try {
  const controlApi = new BrowserControlsRenderer()
  const stateApi = new BrowserStateRenderer(ipcRenderer)
  contextBridge.exposeInMainWorld('controlApi', controlApi)
  contextBridge.exposeInMainWorld('stateApi', stateApi)
} catch (error) {
  console.error(error)
}
