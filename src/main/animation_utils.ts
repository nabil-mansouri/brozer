import { BrowserView, BrowserWindow } from 'electron'

// fade-out window ...
export const fadeWindowOut = (
  _win: BrowserWindow,
  step: number = 0.1,
  fadeEveryXSeconds: number = 10
): Promise<void> => {
  return new Promise<void>((resolve) => {
    let opacity = _win.getOpacity()
    const interval = setInterval(() => {
      if (opacity <= 0) {
        clearInterval(interval)
        resolve()
      }
      _win.setOpacity(opacity)
      opacity -= step
    }, fadeEveryXSeconds)
    return interval
  })
}
// fade-in window ...
export const fadeWindowIn = (
  _win: BrowserWindow,
  step: number = 0.1,
  fadeEveryXSeconds: number = 10
): Promise<void> => {
  return new Promise<void>((resolve) => {
    let opacity = _win.getOpacity()
    const interval = setInterval(() => {
      if (opacity >= 1) {
        clearInterval(interval)
        resolve()
      }
      _win.setOpacity(opacity)
      opacity += step
    }, fadeEveryXSeconds)
    return interval
  })
}

// fade-in window ...
export const animateBoundsUp = (
  _win: BrowserView,
  step: number = 10,
  target: { x: number; y: number; width: number; height: number },
  fadeEveryXSeconds: number = 10
): Promise<void> => {
  return new Promise<void>((resolve) => {
    const current = _win.getBounds()
    const interval = setInterval(() => {
      if (
        current.height < target.height ||
        current.width < target.width ||
        current.x < target.width ||
        current.y < target.y
      ) {
        const height = Math.min(target.height, current.height + step)
        const width = Math.min(target.width, current.width + step)
        const x = Math.min(target.x, current.x + step)
        const y = Math.min(target.y, current.y + step)
        _win.setBounds({ height, width, x, y })
      } else {
        clearInterval(interval)
        resolve()
      }
    }, fadeEveryXSeconds)
    return interval
  })
}



export const animateBoundsDown = (
  _win: BrowserView,
  step: number = 10,
  target: { x: number; y: number; width: number; height: number },
  fadeEveryXSeconds: number = 10
): Promise<void> => {
  return new Promise<void>((resolve) => {
    const current = _win.getBounds()
    const interval = setInterval(() => {
      if (
        current.height > target.height ||
        current.width > target.width ||
        current.x > target.width ||
        current.y > target.y
      ) {
        const height = Math.max(target.height, current.height - step)
        const width = Math.max(target.width, current.width - step)
        const x = Math.max(target.x, current.x - step)
        const y = Math.max(target.y, current.y - step)
        _win.setBounds({ height, width, x, y })
      } else {
        clearInterval(interval)
        resolve()
      }
    }, fadeEveryXSeconds)
    return interval
  })
}
