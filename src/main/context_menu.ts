/* eslint-disable @typescript-eslint/explicit-function-return-type */
import electron, {
  BrowserWindow,
  ContextMenuParams,
  MenuItem,
  PopupOptions,
  WebContents
} from 'electron'
import cliTruncate from 'cli-truncate'
import { download } from 'electron-dl'
import isDev from 'electron-is-dev'

type MenuTemplate = (Electron.MenuItemConstructorOptions | Electron.MenuItem) & {
  transform?: (text: string) => string
}

type MenuSeparator = { type: 'separator' }

type AnyMenuTemplate = MenuTemplate | MenuSeparator

const decorateMenuItem = (menuItem: MenuTemplate) => {
  return (options: Partial<MenuTemplate> = {}): MenuTemplate => {
    if (options.transform && !options.click) {
      menuItem.transform = options.transform
    }

    return menuItem
  }
}

const removeUnusedMenuItems = (
  menuTemplate: Array<AnyMenuTemplate | false | undefined>
): AnyMenuTemplate[] => {
  let notDeletedPreviousElement: AnyMenuTemplate

  const res = menuTemplate
    .filter(
      (menuItem) =>
        menuItem !== undefined &&
        menuItem !== false &&
        new Boolean((menuItem as MenuTemplate).visible) !== false
    )
    .filter((menuItem, index, array) => {
      const toDelete =
        (menuItem as MenuSeparator).type === 'separator' &&
        (!notDeletedPreviousElement ||
          index === array.length - 1 ||
          (array[index + 1] as MenuSeparator).type === 'separator')
      notDeletedPreviousElement = toDelete
        ? notDeletedPreviousElement
        : (menuItem as AnyMenuTemplate)
      return !toDelete
    })
  return res as AnyMenuTemplate[]
}
export type MenuOption = {
  popup?: PopupOptions
  labels?: Record<string, string>
  showSaveImage?: boolean
  showSaveImageAs?: boolean
  showCopyImage?: boolean
  showCopyImageAddress?: boolean
  showSaveVideo?: boolean
  showSaveVideoAs?: boolean
  showCopyVideoAddress?: boolean
  showServices?: boolean
  showSaveLinkAs?: boolean
  showCopyLink?: boolean
  showSelectAll?: boolean
  showLearnSpelling?: boolean
  showInspectElement?: boolean
  showLookUpSelection?: boolean
  showSearchWithGoogle?: boolean
  onShow?: (event: Event) => void
  onClose?: (event: Event) => void
  menu?: (
    defaultActions: Record<string, () => AnyMenuTemplate>,
    props: ContextMenuParams,
    win: BrowserWindow,
    dictionarySuggestions: MenuTemplate[],
    event: Event
  ) => MenuTemplate[]
  prepend?: (
    defaultActions: Record<string, () => AnyMenuTemplate>,
    props: ContextMenuParams,
    win: BrowserWindow,
    event: Event
  ) => MenuTemplate[]
  append?: (
    defaultActions: Record<string, () => AnyMenuTemplate>,
    props: ContextMenuParams,
    win: BrowserWindow,
    event: Event
  ) => MenuTemplate[]
  openUrl: (url: string, newTab: boolean) => void
  shouldShowMenu?: (event: Electron.Event, params: Electron.ContextMenuParams) => boolean
}
export const createContextMenu =
  (win: BrowserWindow, webContents: WebContents, options: MenuOption) =>
  (event: Electron.Event, props: Electron.ContextMenuParams) => {
    if (
      typeof options.shouldShowMenu === 'function' &&
      options.shouldShowMenu(event, props) === false
    ) {
      return
    }

    const { editFlags } = props
    const hasText = props.selectionText.length > 0
    const isLink = Boolean(props.linkURL)
    const can = (type: 'Cut' | 'Copy'): boolean => editFlags[`can${type}`] && hasText

    const defaultActions: Record<string, () => AnyMenuTemplate> = {
      openLink: decorateMenuItem({
        id: 'openLink',
        label: 'Open Lin&k',
        visible: props.linkURL.length > 0 && props.mediaType === 'none',
        enabled: true,
        click() {
          options.openUrl(props.linkURL, false)
        }
      }),
      openLinkNewTab: decorateMenuItem({
        id: 'openLinkNewTab',
        label: 'Open Lin&k In New Tab',
        visible: props.linkURL.length > 0 && props.mediaType === 'none',
        enabled: true,
        click() {
          options.openUrl(props.linkURL, true)
        }
      }),
      separator: (): MenuSeparator => ({ type: 'separator' }),
      learnSpelling: decorateMenuItem({
        id: 'learnSpelling',
        label: '&Learn Spelling',
        enabled: true,
        visible: Boolean(props.isEditable && hasText && props.misspelledWord),
        click(): void {
          const target = webContents
          target.session.addWordToSpellCheckerDictionary(props.misspelledWord)
        }
      }),
      lookUpSelection: decorateMenuItem({
        id: 'lookUpSelection',
        label: 'Look Up “{selection}”',
        enabled: true,
        visible: process.platform === 'darwin' && hasText && !isLink,
        click() {
          if (process.platform === 'darwin') {
            webContents.showDefinitionForSelection()
          }
        }
      }),
      searchWithGoogle: decorateMenuItem({
        id: 'searchWithGoogle',
        label: '&Search with Google',
        visible: hasText,
        enabled: true,
        click() {
          const url = new URL('https://www.google.com/search')
          url.searchParams.set('q', props.selectionText)
          options.openUrl(url.toString(), true)
        }
      }),
      cut: decorateMenuItem({
        id: 'cut',
        label: 'Cu&t',
        enabled: can('Cut'),
        visible: props.isEditable,
        click(menuItem: MenuTemplate) {
          const target = webContents
          if (!menuItem.transform && target) {
            target.cut()
          } else {
            props.selectionText = menuItem.transform
              ? menuItem.transform(props.selectionText)
              : props.selectionText
            electron.clipboard.writeText(props.selectionText)
          }
        }
      }),
      copy: decorateMenuItem({
        id: 'copy',
        label: '&Copy',
        enabled: can('Copy'),
        visible: props.isEditable || hasText,
        click(menuItem: MenuTemplate) {
          const target = webContents
          if (!menuItem.transform && target) {
            target.copy()
          } else {
            props.selectionText = menuItem.transform
              ? menuItem.transform(props.selectionText)
              : props.selectionText
            electron.clipboard.writeText(props.selectionText)
          }
        }
      }),
      paste: decorateMenuItem({
        id: 'paste',
        label: '&Paste',
        enabled: editFlags.canPaste,
        visible: props.isEditable,
        click(menuItem: MenuTemplate) {
          const target = webContents

          if (menuItem.transform) {
            let clipboardContent = electron.clipboard.readText('clipboard')
            clipboardContent = menuItem.transform
              ? menuItem.transform(clipboardContent)
              : clipboardContent
            target.insertText(clipboardContent)
          } else {
            target.paste()
          }
        }
      }),
      selectAll: decorateMenuItem({
        id: 'selectAll',
        label: 'Select &All',
        enabled: true,
        visible: true,
        click() {
          webContents.selectAll()
        }
      }),
      saveImage: decorateMenuItem({
        id: 'saveImage',
        label: 'Save I&mage',
        visible: props.mediaType === 'image',
        enabled: true,
        click(menuItem: MenuTemplate) {
          props.srcURL = menuItem.transform ? menuItem.transform(props.srcURL) : props.srcURL
          download(win, props.srcURL)
        }
      }),
      saveImageAs: decorateMenuItem({
        id: 'saveImageAs',
        label: 'Sa&ve Image As…',
        visible: props.mediaType === 'image',
        enabled: true,
        click(menuItem: MenuTemplate) {
          props.srcURL = menuItem.transform ? menuItem.transform(props.srcURL) : props.srcURL
          download(win, props.srcURL, { saveAs: true })
        }
      }),
      saveVideo: decorateMenuItem({
        id: 'saveVideo',
        label: 'Save Vide&o',
        visible: props.mediaType === 'video',
        enabled: true,
        click(menuItem: MenuTemplate) {
          props.srcURL = menuItem.transform ? menuItem.transform(props.srcURL) : props.srcURL
          download(win, props.srcURL)
        }
      }),
      saveVideoAs: decorateMenuItem({
        id: 'saveVideoAs',
        label: 'Save Video& As…',
        visible: props.mediaType === 'video',
        enabled: true,
        click(menuItem: MenuTemplate) {
          props.srcURL = menuItem.transform ? menuItem.transform(props.srcURL) : props.srcURL
          download(win, props.srcURL, { saveAs: true })
        }
      }),
      copyLink: decorateMenuItem({
        id: 'copyLink',
        label: 'Copy Lin&k',
        visible: props.linkURL.length > 0 && props.mediaType === 'none',
        enabled: true,
        click(menuItem: MenuTemplate) {
          props.linkURL = menuItem.transform ? menuItem.transform(props.linkURL) : props.linkURL

          electron.clipboard.write({
            bookmark: props.linkText,
            text: props.linkURL
          })
        }
      }),
      saveLinkAs: decorateMenuItem({
        id: 'saveLinkAs',
        label: 'Save Link As…',
        visible: props.linkURL.length > 0 && props.mediaType === 'none',
        enabled: true,
        click(menuItem: MenuTemplate) {
          props.linkURL = menuItem.transform ? menuItem.transform(props.linkURL) : props.linkURL
          download(win, props.linkURL, { saveAs: true })
        }
      }),
      copyImage: decorateMenuItem({
        id: 'copyImage',
        label: 'Cop&y Image',
        visible: props.mediaType === 'image',
        enabled: true,
        click() {
          webContents.copyImageAt(props.x, props.y)
        }
      }),
      copyImageAddress: decorateMenuItem({
        id: 'copyImageAddress',
        label: 'C&opy Image Address',
        visible: props.mediaType === 'image',
        enabled: true,
        click(menuItem: MenuTemplate) {
          props.srcURL = menuItem.transform ? menuItem.transform(props.srcURL) : props.srcURL

          electron.clipboard.write({
            bookmark: props.srcURL,
            text: props.srcURL
          })
        }
      }),
      copyVideoAddress: decorateMenuItem({
        id: 'copyVideoAddress',
        label: 'Copy Video Ad&dress',
        visible: props.mediaType === 'video',
        enabled: true,
        click(menuItem: MenuTemplate) {
          props.srcURL = menuItem.transform ? menuItem.transform(props.srcURL) : props.srcURL
          electron.clipboard.write({
            bookmark: props.srcURL,
            text: props.srcURL
          })
        }
      }),
      inspect: () => ({
        id: 'inspect',
        label: 'I&nspect Element',
        enabled: true,
        visible: true,
        click() {
          webContents.inspectElement(props.x, props.y)
          if (webContents.isDevToolsOpened()) {
            webContents.devToolsWebContents?.focus()
          }
        }
      }),
      services: () => ({
        id: 'services',
        label: 'Services',
        role: 'services',
        visible: process.platform === 'darwin' && (props.isEditable || hasText)
      })
    }

    const shouldShowInspectElement =
      typeof options.showInspectElement === 'boolean' ? options.showInspectElement : isDev
    const shouldShowSelectAll =
      options.showSelectAll || (options.showSelectAll !== false && process.platform !== 'darwin')

    function word(suggestion: string): MenuTemplate {
      return {
        id: 'dictionarySuggestions',
        label: suggestion,
        enabled: true,
        visible: Boolean(props.isEditable && hasText && props.misspelledWord),
        click(menuItem) {
          const target = webContents
          target.replaceMisspelling(menuItem.label)
        }
      }
    }

    let dictionarySuggestions: MenuTemplate[] = []
    if (hasText && props.misspelledWord && props.dictionarySuggestions.length > 0) {
      dictionarySuggestions = props.dictionarySuggestions.map((suggestion) => word(suggestion))
    } else {
      dictionarySuggestions.push({
        id: 'dictionarySuggestions',
        label: 'No Guesses Found',
        visible: Boolean(hasText && props.misspelledWord),
        enabled: false,
        click: () => {}
      })
    }

    let menuTemplate: Array<AnyMenuTemplate> = removeUnusedMenuItems([
      defaultActions.openLink(),
      defaultActions.openLinkNewTab(),
      defaultActions.separator(),
      dictionarySuggestions.length > 0 && defaultActions.separator(),
      ...dictionarySuggestions,
      defaultActions.separator(),
      options.showLearnSpelling !== false && defaultActions.learnSpelling(),
      defaultActions.separator(),
      options.showLookUpSelection !== false && defaultActions.lookUpSelection(),
      defaultActions.separator(),
      options.showSearchWithGoogle !== false && defaultActions.searchWithGoogle(),
      defaultActions.separator(),
      defaultActions.cut(),
      defaultActions.copy(),
      defaultActions.paste(),
      shouldShowSelectAll && defaultActions.selectAll(),
      defaultActions.separator(),
      options.showSaveImage && defaultActions.saveImage(),
      options.showSaveImageAs && defaultActions.saveImageAs(),
      options.showCopyImage !== false && defaultActions.copyImage(),
      options.showCopyImageAddress && defaultActions.copyImageAddress(),
      options.showSaveVideo && defaultActions.saveVideo(),
      options.showSaveVideoAs && defaultActions.saveVideoAs(),
      options.showCopyVideoAddress && defaultActions.copyVideoAddress(),
      defaultActions.separator(),
      options.showCopyLink !== false && defaultActions.copyLink(),
      options.showSaveLinkAs && defaultActions.saveLinkAs(),
      defaultActions.separator(),
      shouldShowInspectElement && defaultActions.inspect(),
      options.showServices && defaultActions.services(),
      defaultActions.separator()
    ])

    if (options.menu) {
      menuTemplate = options.menu(defaultActions, props, win, dictionarySuggestions, event)
    }

    if (options.prepend) {
      const result = options.prepend(defaultActions, props, win, event)

      if (Array.isArray(result)) {
        menuTemplate.unshift(...result)
      }
    }

    if (options.append) {
      const result = options.append(defaultActions, props, win, event)

      if (Array.isArray(result)) {
        menuTemplate.push(...result)
      }
    }

    // Filter out leading/trailing separators
    // TODO: https://github.com/electron/electron/issues/5869
    menuTemplate = removeUnusedMenuItems(menuTemplate)

    for (const menuItem of menuTemplate as MenuItem[]) {
      // Apply custom labels for default menu items
      if (options.labels && options.labels[menuItem.id]) {
        menuItem.label = options.labels[menuItem.id]
      }

      // Replace placeholders in menu item labels
      if (typeof menuItem.label === 'string' && menuItem.label.includes('{selection}')) {
        const selectionString =
          typeof props.selectionText === 'string' ? props.selectionText.trim() : ''
        menuItem.label = menuItem.label.replace(
          '{selection}',
          cliTruncate(selectionString, 25).replace(/&/g, '&&')
        )
      }
    }

    if (menuTemplate.length > 0) {
      const menu = electron.Menu.buildFromTemplate(menuTemplate)

      if (typeof options.onShow === 'function') {
        menu.on('menu-will-show', options.onShow)
      }

      if (typeof options.onClose === 'function') {
        menu.on('menu-will-close', options.onClose)
      }
      menu.popup(
        options.popup || {
          window: win,
          x: props.x,
          y: props.y
        }
      )
    }
  }
export function bindContextMenu(win: BrowserWindow, webContents: WebContents, options: MenuOption) {
  const handler = createContextMenu(win, webContents, options)
  webContents.on('context-menu', handler)

  return () => {
    if (win.isDestroyed()) {
      return
    }

    webContents.removeListener('context-menu', handler)
  }
}
type MenuOptionDispose = () => void
export function bindContextToWindow(
  win: BrowserWindow,
  webContents: WebContents,
  options: MenuOption
): MenuOptionDispose {
  if (process.type === 'renderer') {
    throw new Error('Cannot use electron-context-menu in the renderer process!')
  }

  let isDisposed = false
  const disposables: Array<MenuOptionDispose> = []

  const init = () => {
    if (isDisposed) {
      return
    }

    const disposeMenu = bindContextMenu(win, webContents, options)

    disposables.push(disposeMenu)
    const removeDisposable = () => {
      const index = disposables.indexOf(disposeMenu)
      if (index !== -1) {
        disposables.splice(index, 1)
      }
    }

    if (typeof win.once !== 'undefined') {
      // Support for BrowserView
      win.once('closed', removeDisposable)
    }

    disposables.push(() => {
      win.off('closed', removeDisposable)
    })
  }

  const dispose = () => {
    for (const dispose of disposables) {
      dispose()
    }

    disposables.length = 0
    isDisposed = true
  }

  init()

  return dispose
}
