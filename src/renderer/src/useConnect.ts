import { useEffect, useState } from 'react'
import { navigationUtilsCommon } from '../../common/navigation_utils'
import { BrowserControlsInterface } from '../../common/browser_controls_interface'
import { BrowserState, BrowserStateWithListener } from '../../common/browser_state_interface'

declare let stateApi: BrowserStateWithListener
declare let controlApi: BrowserControlsInterface
const mutex = {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface useConnectParams {}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useConnect(_: Partial<useConnectParams> = {}): BrowserState {
  const [state, setState] = useState<BrowserState>({
    views: [],
    jsAttached: [],
    downloads: [],
    windows: [],
    foundResult: undefined
  })

  const listener = stateApi.listen({
    onStateChange(s) {
      const newView = s.views.find((e) => e.viewId === s.currentViewId)
      if (newView) {
        if (newView.errDesc === 'ERR_NAME_NOT_RESOLVED' && mutex[newView.href] != newView.errAt) {
          const url = navigationUtilsCommon.googleSearch(newView.url)
          controlApi.onUrlEnter(url)
          mutex[newView.href] = newView.errAt
        }
      }
      setState(s)
    },
    getState() {
      return Promise.resolve(state)
    }
  })

  useEffect(() => {
    controlApi.onControlReady({ jsAttached: [] })
    controlApi.onNewTab('https://google.fr', true, {}, false)
    return (): void => {
      listener()
    }
  }, [])

  return state
}
