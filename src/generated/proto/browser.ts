/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "";

export interface BrowserControlMessage {
  msg?:
    | { $case: "onControlReady"; onControlReady: BrowserControlReady }
    | { $case: "onUrlChange"; onUrlChange: BrowserControlUrlChanged }
    | { $case: "onUrlEnter"; onUrlEnter: BrowserControlUrlChanged }
    | { $case: "onNewTab"; onNewTab: BrowserControlNewTab }
    | { $case: "onSwitchTab"; onSwitchTab: BrowserControlTab }
    | { $case: "onAction"; onAction: BrowserControlAction }
    | { $case: "onPrint"; onPrint: BrowserPrintOption }
    | { $case: "onSave"; onSave: BrowserSavePageOption }
    | { $case: "onCapture"; onCapture: BrowserCaptureOption }
    | { $case: "onSaveDialog"; onSaveDialog: BrowserSaveDialogOption }
    | { $case: "onOpenDialog"; onOpenDialog: BrowserOpenDialogOptions }
    | { $case: "onShowCertDialog"; onShowCertDialog: BrowserCertificateTrustDialogOptions }
    | { $case: "onAudio"; onAudio: BrowserControlAudio }
    | { $case: "onContent"; onContent: BrowserControlContent }
    | { $case: "onDownload"; onDownload: BrowserControlDownload }
    | { $case: "onFind"; onFind: BrowserControlFind }
    | { $case: "onStopFind"; onStopFind: BrowserControlStopFind }
    | { $case: "onCloseTab"; onCloseTab: BrowserControlTab }
    | { $case: "onNewModal"; onNewModal: BrowserControlNewModal }
    | { $case: "onUpdateModal"; onUpdateModal: BrowserControlUpdateModal }
    | { $case: "onCloseModal"; onCloseModal: number };
  responseChannel?: string | undefined;
}

export interface BrowserControlResponse {
  msg?:
    | { $case: "onCapture"; onCapture: BrowserCaptureResponse }
    | { $case: "onSaveDialog"; onSaveDialog: BrowserSaveDialogReturnValue }
    | { $case: "onOpenDialog"; onOpenDialog: BrowserOpenDialogReturnValue }
    | { $case: "onShowCertificate"; onShowCertificate: boolean }
    | { $case: "onFind"; onFind: BrowserFindResponse };
}

export interface BrowserCaptureResponse {
  url: string;
}

export interface BrowserFindResponse {
  requestId?: number | undefined;
}

export interface BrowserSaveDialogReturnValue {
  canceled: boolean;
  filePath?: string | undefined;
  bookmark?: string | undefined;
}

export interface BrowserOpenDialogReturnValue {
  canceled: boolean;
  filePaths: string[];
  bookmarks: string[];
}

export interface BrowserControlReady {
  jsAttached: string[];
}

export interface BrowserControlUrlChanged {
  url: string;
}

export interface BrowserControlNewTab {
  url: string;
  partition?: string | undefined;
  devTools?: boolean | undefined;
  ifNoViews?: boolean | undefined;
  hideNavbar?: boolean | undefined;
}

export interface BrowserControlUpdateModal {
  opts: BrowserControlNewModal | undefined;
  id: number;
}

export interface BrowserControlNewModal {
  width?: number | undefined;
  height?: number | undefined;
  x?: number | undefined;
  y?: number | undefined;
  useContentSize?: boolean | undefined;
  center?: boolean | undefined;
  minWidth?: number | undefined;
  minHeight?: number | undefined;
  maxWidth?: number | undefined;
  maxHeight?: number | undefined;
  alwaysOnTop?: boolean | undefined;
  show?: boolean | undefined;
  backgroundColor?: string | undefined;
  opacity?: number | undefined;
  transparent?: boolean | undefined;
  modal?: boolean | undefined;
  hasShadow?: boolean | undefined;
  xFromRight?: boolean | undefined;
  yFromBottom?: boolean | undefined;
  url: string;
}

export interface BrowserControlTab {
  id: number;
}

export interface BrowserControlAudio {
  muted: boolean;
}

export interface BrowserControlAction {
  action: BrowserControlAction_Action;
}

export const BrowserControlAction_Action = {
  UNDEFINED: "UNDEFINED",
  GOBACK: "GOBACK",
  GOFORWARD: "GOFORWARD",
  STOP: "STOP",
  RELOAD: "RELOAD",
  TOGGLE_MAXIMIZE: "TOGGLE_MAXIMIZE",
  MAXIMIZE: "MAXIMIZE",
  MINIMIZE: "MINIMIZE",
  TOGGLE_DEVTOOLS: "TOGGLE_DEVTOOLS",
  ZOOM_IN: "ZOOM_IN",
  ZOOM_OUT: "ZOOM_OUT",
  RESET_ZOOM: "RESET_ZOOM",
  FORCE_RELOAD: "FORCE_RELOAD",
} as const;

export type BrowserControlAction_Action = typeof BrowserControlAction_Action[keyof typeof BrowserControlAction_Action];

export function browserControlAction_ActionFromJSON(object: any): BrowserControlAction_Action {
  switch (object) {
    case 0:
    case "UNDEFINED":
      return BrowserControlAction_Action.UNDEFINED;
    case 1:
    case "GOBACK":
      return BrowserControlAction_Action.GOBACK;
    case 2:
    case "GOFORWARD":
      return BrowserControlAction_Action.GOFORWARD;
    case 3:
    case "STOP":
      return BrowserControlAction_Action.STOP;
    case 4:
    case "RELOAD":
      return BrowserControlAction_Action.RELOAD;
    case 5:
    case "TOGGLE_MAXIMIZE":
      return BrowserControlAction_Action.TOGGLE_MAXIMIZE;
    case 6:
    case "MAXIMIZE":
      return BrowserControlAction_Action.MAXIMIZE;
    case 7:
    case "MINIMIZE":
      return BrowserControlAction_Action.MINIMIZE;
    case 8:
    case "TOGGLE_DEVTOOLS":
      return BrowserControlAction_Action.TOGGLE_DEVTOOLS;
    case 9:
    case "ZOOM_IN":
      return BrowserControlAction_Action.ZOOM_IN;
    case 10:
    case "ZOOM_OUT":
      return BrowserControlAction_Action.ZOOM_OUT;
    case 11:
    case "RESET_ZOOM":
      return BrowserControlAction_Action.RESET_ZOOM;
    case 12:
    case "FORCE_RELOAD":
      return BrowserControlAction_Action.FORCE_RELOAD;
    default:
      throw new tsProtoGlobalThis.Error("Unrecognized enum value " + object + " for enum BrowserControlAction_Action");
  }
}

export function browserControlAction_ActionToJSON(object: BrowserControlAction_Action): string {
  switch (object) {
    case BrowserControlAction_Action.UNDEFINED:
      return "UNDEFINED";
    case BrowserControlAction_Action.GOBACK:
      return "GOBACK";
    case BrowserControlAction_Action.GOFORWARD:
      return "GOFORWARD";
    case BrowserControlAction_Action.STOP:
      return "STOP";
    case BrowserControlAction_Action.RELOAD:
      return "RELOAD";
    case BrowserControlAction_Action.TOGGLE_MAXIMIZE:
      return "TOGGLE_MAXIMIZE";
    case BrowserControlAction_Action.MAXIMIZE:
      return "MAXIMIZE";
    case BrowserControlAction_Action.MINIMIZE:
      return "MINIMIZE";
    case BrowserControlAction_Action.TOGGLE_DEVTOOLS:
      return "TOGGLE_DEVTOOLS";
    case BrowserControlAction_Action.ZOOM_IN:
      return "ZOOM_IN";
    case BrowserControlAction_Action.ZOOM_OUT:
      return "ZOOM_OUT";
    case BrowserControlAction_Action.RESET_ZOOM:
      return "RESET_ZOOM";
    case BrowserControlAction_Action.FORCE_RELOAD:
      return "FORCE_RELOAD";
    default:
      throw new tsProtoGlobalThis.Error("Unrecognized enum value " + object + " for enum BrowserControlAction_Action");
  }
}

export function browserControlAction_ActionToNumber(object: BrowserControlAction_Action): number {
  switch (object) {
    case BrowserControlAction_Action.UNDEFINED:
      return 0;
    case BrowserControlAction_Action.GOBACK:
      return 1;
    case BrowserControlAction_Action.GOFORWARD:
      return 2;
    case BrowserControlAction_Action.STOP:
      return 3;
    case BrowserControlAction_Action.RELOAD:
      return 4;
    case BrowserControlAction_Action.TOGGLE_MAXIMIZE:
      return 5;
    case BrowserControlAction_Action.MAXIMIZE:
      return 6;
    case BrowserControlAction_Action.MINIMIZE:
      return 7;
    case BrowserControlAction_Action.TOGGLE_DEVTOOLS:
      return 8;
    case BrowserControlAction_Action.ZOOM_IN:
      return 9;
    case BrowserControlAction_Action.ZOOM_OUT:
      return 10;
    case BrowserControlAction_Action.RESET_ZOOM:
      return 11;
    case BrowserControlAction_Action.FORCE_RELOAD:
      return 12;
    default:
      throw new tsProtoGlobalThis.Error("Unrecognized enum value " + object + " for enum BrowserControlAction_Action");
  }
}

export interface BrowserPrintOption {
  silent?: boolean | undefined;
  printBackground?: boolean | undefined;
  deviceName?: string | undefined;
  color?: boolean | undefined;
  landscape?: boolean | undefined;
  scaleFactor?: number | undefined;
  pagesPerSheet?: number | undefined;
  collate?: boolean | undefined;
  copies?: number | undefined;
  fromPage?: number | undefined;
  toPage?: number | undefined;
  header?: string | undefined;
  footer?: string | undefined;
  pageSize?: string | undefined;
}

export interface BrowserSavePageOption {
  fullPath: string;
  saveType: BrowserSavePageOption_SaveType;
}

export const BrowserSavePageOption_SaveType = {
  HTMLOnly: "HTMLOnly",
  HTMLComplete: "HTMLComplete",
  MHTML: "MHTML",
} as const;

export type BrowserSavePageOption_SaveType =
  typeof BrowserSavePageOption_SaveType[keyof typeof BrowserSavePageOption_SaveType];

export function browserSavePageOption_SaveTypeFromJSON(object: any): BrowserSavePageOption_SaveType {
  switch (object) {
    case 0:
    case "HTMLOnly":
      return BrowserSavePageOption_SaveType.HTMLOnly;
    case 1:
    case "HTMLComplete":
      return BrowserSavePageOption_SaveType.HTMLComplete;
    case 2:
    case "MHTML":
      return BrowserSavePageOption_SaveType.MHTML;
    default:
      throw new tsProtoGlobalThis.Error(
        "Unrecognized enum value " + object + " for enum BrowserSavePageOption_SaveType",
      );
  }
}

export function browserSavePageOption_SaveTypeToJSON(object: BrowserSavePageOption_SaveType): string {
  switch (object) {
    case BrowserSavePageOption_SaveType.HTMLOnly:
      return "HTMLOnly";
    case BrowserSavePageOption_SaveType.HTMLComplete:
      return "HTMLComplete";
    case BrowserSavePageOption_SaveType.MHTML:
      return "MHTML";
    default:
      throw new tsProtoGlobalThis.Error(
        "Unrecognized enum value " + object + " for enum BrowserSavePageOption_SaveType",
      );
  }
}

export function browserSavePageOption_SaveTypeToNumber(object: BrowserSavePageOption_SaveType): number {
  switch (object) {
    case BrowserSavePageOption_SaveType.HTMLOnly:
      return 0;
    case BrowserSavePageOption_SaveType.HTMLComplete:
      return 1;
    case BrowserSavePageOption_SaveType.MHTML:
      return 2;
    default:
      throw new tsProtoGlobalThis.Error(
        "Unrecognized enum value " + object + " for enum BrowserSavePageOption_SaveType",
      );
  }
}

export interface BrowserCaptureOption {
  path?: string | undefined;
}

export interface BrowserFileFilter {
  extensions: string[];
  name: string;
}

export interface BrowserSaveDialogOption {
  title?: string | undefined;
  defaultPath?: string | undefined;
  buttonLabel?: string | undefined;
  filters: BrowserFileFilter[];
  message?: string | undefined;
  nameFieldLabel?: string | undefined;
  showsTagField?: boolean | undefined;
  properties: BrowserSaveDialogOption_SaveFileOption[];
  securityScopedBookmarks?: boolean | undefined;
}

export const BrowserSaveDialogOption_SaveFileOption = {
  dontAddToRecent: "dontAddToRecent",
  showHiddenFiles: "showHiddenFiles",
  createDirectory: "createDirectory",
  treatPackageAsDirectory: "treatPackageAsDirectory",
  showOverwriteConfirmation: "showOverwriteConfirmation",
} as const;

export type BrowserSaveDialogOption_SaveFileOption =
  typeof BrowserSaveDialogOption_SaveFileOption[keyof typeof BrowserSaveDialogOption_SaveFileOption];

export function browserSaveDialogOption_SaveFileOptionFromJSON(object: any): BrowserSaveDialogOption_SaveFileOption {
  switch (object) {
    case 0:
    case "dontAddToRecent":
      return BrowserSaveDialogOption_SaveFileOption.dontAddToRecent;
    case 1:
    case "showHiddenFiles":
      return BrowserSaveDialogOption_SaveFileOption.showHiddenFiles;
    case 2:
    case "createDirectory":
      return BrowserSaveDialogOption_SaveFileOption.createDirectory;
    case 3:
    case "treatPackageAsDirectory":
      return BrowserSaveDialogOption_SaveFileOption.treatPackageAsDirectory;
    case 4:
    case "showOverwriteConfirmation":
      return BrowserSaveDialogOption_SaveFileOption.showOverwriteConfirmation;
    default:
      throw new tsProtoGlobalThis.Error(
        "Unrecognized enum value " + object + " for enum BrowserSaveDialogOption_SaveFileOption",
      );
  }
}

export function browserSaveDialogOption_SaveFileOptionToJSON(object: BrowserSaveDialogOption_SaveFileOption): string {
  switch (object) {
    case BrowserSaveDialogOption_SaveFileOption.dontAddToRecent:
      return "dontAddToRecent";
    case BrowserSaveDialogOption_SaveFileOption.showHiddenFiles:
      return "showHiddenFiles";
    case BrowserSaveDialogOption_SaveFileOption.createDirectory:
      return "createDirectory";
    case BrowserSaveDialogOption_SaveFileOption.treatPackageAsDirectory:
      return "treatPackageAsDirectory";
    case BrowserSaveDialogOption_SaveFileOption.showOverwriteConfirmation:
      return "showOverwriteConfirmation";
    default:
      throw new tsProtoGlobalThis.Error(
        "Unrecognized enum value " + object + " for enum BrowserSaveDialogOption_SaveFileOption",
      );
  }
}

export function browserSaveDialogOption_SaveFileOptionToNumber(object: BrowserSaveDialogOption_SaveFileOption): number {
  switch (object) {
    case BrowserSaveDialogOption_SaveFileOption.dontAddToRecent:
      return 0;
    case BrowserSaveDialogOption_SaveFileOption.showHiddenFiles:
      return 1;
    case BrowserSaveDialogOption_SaveFileOption.createDirectory:
      return 2;
    case BrowserSaveDialogOption_SaveFileOption.treatPackageAsDirectory:
      return 3;
    case BrowserSaveDialogOption_SaveFileOption.showOverwriteConfirmation:
      return 4;
    default:
      throw new tsProtoGlobalThis.Error(
        "Unrecognized enum value " + object + " for enum BrowserSaveDialogOption_SaveFileOption",
      );
  }
}

export interface BrowserOpenDialogOptions {
  title?: string | undefined;
  defaultPath?: string | undefined;
  buttonLabel?: string | undefined;
  filters: BrowserFileFilter[];
  properties: BrowserOpenDialogOptions_OpenFileOption[];
  message?: string | undefined;
  securityScopedBookmarks?: boolean | undefined;
}

export const BrowserOpenDialogOptions_OpenFileOption = {
  dontAddToRecent: "dontAddToRecent",
  openFile: "openFile",
  openDirectory: "openDirectory",
  multiSelections: "multiSelections",
  showHiddenFiles: "showHiddenFiles",
  createDirectory: "createDirectory",
  promptToCreate: "promptToCreate",
  noResolveAliases: "noResolveAliases",
  treatPackageAsDirectory: "treatPackageAsDirectory",
} as const;

export type BrowserOpenDialogOptions_OpenFileOption =
  typeof BrowserOpenDialogOptions_OpenFileOption[keyof typeof BrowserOpenDialogOptions_OpenFileOption];

export function browserOpenDialogOptions_OpenFileOptionFromJSON(object: any): BrowserOpenDialogOptions_OpenFileOption {
  switch (object) {
    case 0:
    case "dontAddToRecent":
      return BrowserOpenDialogOptions_OpenFileOption.dontAddToRecent;
    case 1:
    case "openFile":
      return BrowserOpenDialogOptions_OpenFileOption.openFile;
    case 2:
    case "openDirectory":
      return BrowserOpenDialogOptions_OpenFileOption.openDirectory;
    case 3:
    case "multiSelections":
      return BrowserOpenDialogOptions_OpenFileOption.multiSelections;
    case 4:
    case "showHiddenFiles":
      return BrowserOpenDialogOptions_OpenFileOption.showHiddenFiles;
    case 5:
    case "createDirectory":
      return BrowserOpenDialogOptions_OpenFileOption.createDirectory;
    case 6:
    case "promptToCreate":
      return BrowserOpenDialogOptions_OpenFileOption.promptToCreate;
    case 7:
    case "noResolveAliases":
      return BrowserOpenDialogOptions_OpenFileOption.noResolveAliases;
    case 8:
    case "treatPackageAsDirectory":
      return BrowserOpenDialogOptions_OpenFileOption.treatPackageAsDirectory;
    default:
      throw new tsProtoGlobalThis.Error(
        "Unrecognized enum value " + object + " for enum BrowserOpenDialogOptions_OpenFileOption",
      );
  }
}

export function browserOpenDialogOptions_OpenFileOptionToJSON(object: BrowserOpenDialogOptions_OpenFileOption): string {
  switch (object) {
    case BrowserOpenDialogOptions_OpenFileOption.dontAddToRecent:
      return "dontAddToRecent";
    case BrowserOpenDialogOptions_OpenFileOption.openFile:
      return "openFile";
    case BrowserOpenDialogOptions_OpenFileOption.openDirectory:
      return "openDirectory";
    case BrowserOpenDialogOptions_OpenFileOption.multiSelections:
      return "multiSelections";
    case BrowserOpenDialogOptions_OpenFileOption.showHiddenFiles:
      return "showHiddenFiles";
    case BrowserOpenDialogOptions_OpenFileOption.createDirectory:
      return "createDirectory";
    case BrowserOpenDialogOptions_OpenFileOption.promptToCreate:
      return "promptToCreate";
    case BrowserOpenDialogOptions_OpenFileOption.noResolveAliases:
      return "noResolveAliases";
    case BrowserOpenDialogOptions_OpenFileOption.treatPackageAsDirectory:
      return "treatPackageAsDirectory";
    default:
      throw new tsProtoGlobalThis.Error(
        "Unrecognized enum value " + object + " for enum BrowserOpenDialogOptions_OpenFileOption",
      );
  }
}

export function browserOpenDialogOptions_OpenFileOptionToNumber(
  object: BrowserOpenDialogOptions_OpenFileOption,
): number {
  switch (object) {
    case BrowserOpenDialogOptions_OpenFileOption.dontAddToRecent:
      return 0;
    case BrowserOpenDialogOptions_OpenFileOption.openFile:
      return 1;
    case BrowserOpenDialogOptions_OpenFileOption.openDirectory:
      return 2;
    case BrowserOpenDialogOptions_OpenFileOption.multiSelections:
      return 3;
    case BrowserOpenDialogOptions_OpenFileOption.showHiddenFiles:
      return 4;
    case BrowserOpenDialogOptions_OpenFileOption.createDirectory:
      return 5;
    case BrowserOpenDialogOptions_OpenFileOption.promptToCreate:
      return 6;
    case BrowserOpenDialogOptions_OpenFileOption.noResolveAliases:
      return 7;
    case BrowserOpenDialogOptions_OpenFileOption.treatPackageAsDirectory:
      return 8;
    default:
      throw new tsProtoGlobalThis.Error(
        "Unrecognized enum value " + object + " for enum BrowserOpenDialogOptions_OpenFileOption",
      );
  }
}

export interface BrowserCertificateTrustDialogOptions {
  certificate: BrowserCertificate | undefined;
  message?: string | undefined;
}

export interface BrowserCertificate {
  data?: string | undefined;
  fingerprint?: string | undefined;
  issuer?: BrowserCertificatePrincipal | undefined;
  issuerCert?: BrowserCertificate | undefined;
  issuerName?: string | undefined;
  serialNumber?: string | undefined;
  subject?: BrowserCertificatePrincipal | undefined;
  subjectName?: string | undefined;
  validExpiry?: number | undefined;
  validStart?: number | undefined;
}

export interface BrowserCertificatePrincipal {
  commonName?: string | undefined;
  country?: string | undefined;
  locality?: string | undefined;
  organizations: string[];
  organizationUnits: string[];
  state?: string | undefined;
}

export interface BrowserControlContent {
  relativeFile?: string | undefined;
  absoluteFile?: string | undefined;
  httpFile?: string | undefined;
}

export interface BrowserControlDownload {
  id: string;
  action: BrowserControlDownload_Action;
}

export const BrowserControlDownload_Action = { resume: "resume", pause: "pause", interrupt: "interrupt" } as const;

export type BrowserControlDownload_Action =
  typeof BrowserControlDownload_Action[keyof typeof BrowserControlDownload_Action];

export function browserControlDownload_ActionFromJSON(object: any): BrowserControlDownload_Action {
  switch (object) {
    case 0:
    case "resume":
      return BrowserControlDownload_Action.resume;
    case 1:
    case "pause":
      return BrowserControlDownload_Action.pause;
    case 2:
    case "interrupt":
      return BrowserControlDownload_Action.interrupt;
    default:
      throw new tsProtoGlobalThis.Error(
        "Unrecognized enum value " + object + " for enum BrowserControlDownload_Action",
      );
  }
}

export function browserControlDownload_ActionToJSON(object: BrowserControlDownload_Action): string {
  switch (object) {
    case BrowserControlDownload_Action.resume:
      return "resume";
    case BrowserControlDownload_Action.pause:
      return "pause";
    case BrowserControlDownload_Action.interrupt:
      return "interrupt";
    default:
      throw new tsProtoGlobalThis.Error(
        "Unrecognized enum value " + object + " for enum BrowserControlDownload_Action",
      );
  }
}

export function browserControlDownload_ActionToNumber(object: BrowserControlDownload_Action): number {
  switch (object) {
    case BrowserControlDownload_Action.resume:
      return 0;
    case BrowserControlDownload_Action.pause:
      return 1;
    case BrowserControlDownload_Action.interrupt:
      return 2;
    default:
      throw new tsProtoGlobalThis.Error(
        "Unrecognized enum value " + object + " for enum BrowserControlDownload_Action",
      );
  }
}

export interface BrowserControlFind {
  searchText: string;
  forward?: boolean | undefined;
  findNext?: boolean | undefined;
  matchCase?: boolean | undefined;
}

export interface BrowserControlStopFind {
  action: BrowserControlStopFind_Action;
}

export const BrowserControlStopFind_Action = {
  activateSelection: "activateSelection",
  clearSelection: "clearSelection",
  keepSelection: "keepSelection",
} as const;

export type BrowserControlStopFind_Action =
  typeof BrowserControlStopFind_Action[keyof typeof BrowserControlStopFind_Action];

export function browserControlStopFind_ActionFromJSON(object: any): BrowserControlStopFind_Action {
  switch (object) {
    case 0:
    case "activateSelection":
      return BrowserControlStopFind_Action.activateSelection;
    case 1:
    case "clearSelection":
      return BrowserControlStopFind_Action.clearSelection;
    case 2:
    case "keepSelection":
      return BrowserControlStopFind_Action.keepSelection;
    default:
      throw new tsProtoGlobalThis.Error(
        "Unrecognized enum value " + object + " for enum BrowserControlStopFind_Action",
      );
  }
}

export function browserControlStopFind_ActionToJSON(object: BrowserControlStopFind_Action): string {
  switch (object) {
    case BrowserControlStopFind_Action.activateSelection:
      return "activateSelection";
    case BrowserControlStopFind_Action.clearSelection:
      return "clearSelection";
    case BrowserControlStopFind_Action.keepSelection:
      return "keepSelection";
    default:
      throw new tsProtoGlobalThis.Error(
        "Unrecognized enum value " + object + " for enum BrowserControlStopFind_Action",
      );
  }
}

export function browserControlStopFind_ActionToNumber(object: BrowserControlStopFind_Action): number {
  switch (object) {
    case BrowserControlStopFind_Action.activateSelection:
      return 0;
    case BrowserControlStopFind_Action.clearSelection:
      return 1;
    case BrowserControlStopFind_Action.keepSelection:
      return 2;
    default:
      throw new tsProtoGlobalThis.Error(
        "Unrecognized enum value " + object + " for enum BrowserControlStopFind_Action",
      );
  }
}

export interface BrowserState {
  views: BrowserStateView[];
  currentViewId?: number | undefined;
  downloads: BrowserFile[];
  foundResult?: BrowserFoundResult | undefined;
  jsAttached: string[];
  windows: BrowserWindowInfo[];
}

export interface BrowserWindowInfo {
  id: number;
  url: string;
  isModal: boolean;
  isVisible: boolean;
  isFocused: boolean;
}

export interface BrowserFoundResult {
  requestId: number;
  activeMatchOrdinal: number;
  matches: number;
  selectionArea: BrowserFoundResult_Rectangle | undefined;
  finalUpdate: boolean;
}

export interface BrowserFoundResult_Rectangle {
  height: number;
  width: number;
  x: number;
  y: number;
}

export interface BrowserFile {
  id: string;
  url: string;
  filePath: string;
  startTime: number;
  lastUpdate: string;
  totalBytes: number;
  receivedBytes: number;
  mimeType: string;
  paused: boolean;
  state: BrowserFile_State;
  fileName: string;
}

export const BrowserFile_State = {
  UNDEFINED: "UNDEFINED",
  progressing: "progressing",
  completed: "completed",
  cancelled: "cancelled",
  interrupted: "interrupted",
} as const;

export type BrowserFile_State = typeof BrowserFile_State[keyof typeof BrowserFile_State];

export function browserFile_StateFromJSON(object: any): BrowserFile_State {
  switch (object) {
    case 0:
    case "UNDEFINED":
      return BrowserFile_State.UNDEFINED;
    case 1:
    case "progressing":
      return BrowserFile_State.progressing;
    case 2:
    case "completed":
      return BrowserFile_State.completed;
    case 3:
    case "cancelled":
      return BrowserFile_State.cancelled;
    case 4:
    case "interrupted":
      return BrowserFile_State.interrupted;
    default:
      throw new tsProtoGlobalThis.Error("Unrecognized enum value " + object + " for enum BrowserFile_State");
  }
}

export function browserFile_StateToJSON(object: BrowserFile_State): string {
  switch (object) {
    case BrowserFile_State.UNDEFINED:
      return "UNDEFINED";
    case BrowserFile_State.progressing:
      return "progressing";
    case BrowserFile_State.completed:
      return "completed";
    case BrowserFile_State.cancelled:
      return "cancelled";
    case BrowserFile_State.interrupted:
      return "interrupted";
    default:
      throw new tsProtoGlobalThis.Error("Unrecognized enum value " + object + " for enum BrowserFile_State");
  }
}

export function browserFile_StateToNumber(object: BrowserFile_State): number {
  switch (object) {
    case BrowserFile_State.UNDEFINED:
      return 0;
    case BrowserFile_State.progressing:
      return 1;
    case BrowserFile_State.completed:
      return 2;
    case BrowserFile_State.cancelled:
      return 3;
    case BrowserFile_State.interrupted:
      return 4;
    default:
      throw new tsProtoGlobalThis.Error("Unrecognized enum value " + object + " for enum BrowserFile_State");
  }
}

export interface BrowserStateView {
  title: string;
  href: string;
  url: string;
  host: string;
  isLoading: boolean;
  favicon: string;
  viewId: number;
  canGoBack: boolean;
  canGoForward: boolean;
  certError?: string | undefined;
  certErrAt?: number | undefined;
  cert?: BrowserCertificate | undefined;
  certDetails?: BrowserCustomCert | undefined;
  certStatus?: BrowserStateView_CertStatus | undefined;
  mediaState?: BrowserStateView_MediaState | undefined;
  isAudible?: boolean | undefined;
  isMuted?:
    | boolean
    | undefined;
  /** https://source.chromium.org/chromium/chromium/src/+/main:net/base/net_error_list.h;l=29 */
  errCode?: number | undefined;
  errDesc?: string | undefined;
  errAt?: number | undefined;
  isCrashed?: boolean | undefined;
  hideNavbar?: boolean | undefined;
  urlBeforeResolve?: string | undefined;
  urlAfterResolve?: string | undefined;
}

export const BrowserStateView_CertStatus = { UNDEFINED: "UNDEFINED", OK: "OK", CERT_REVOKED: "CERT_REVOKED" } as const;

export type BrowserStateView_CertStatus = typeof BrowserStateView_CertStatus[keyof typeof BrowserStateView_CertStatus];

export function browserStateView_CertStatusFromJSON(object: any): BrowserStateView_CertStatus {
  switch (object) {
    case 0:
    case "UNDEFINED":
      return BrowserStateView_CertStatus.UNDEFINED;
    case 1:
    case "OK":
      return BrowserStateView_CertStatus.OK;
    case 2:
    case "CERT_REVOKED":
      return BrowserStateView_CertStatus.CERT_REVOKED;
    default:
      throw new tsProtoGlobalThis.Error("Unrecognized enum value " + object + " for enum BrowserStateView_CertStatus");
  }
}

export function browserStateView_CertStatusToJSON(object: BrowserStateView_CertStatus): string {
  switch (object) {
    case BrowserStateView_CertStatus.UNDEFINED:
      return "UNDEFINED";
    case BrowserStateView_CertStatus.OK:
      return "OK";
    case BrowserStateView_CertStatus.CERT_REVOKED:
      return "CERT_REVOKED";
    default:
      throw new tsProtoGlobalThis.Error("Unrecognized enum value " + object + " for enum BrowserStateView_CertStatus");
  }
}

export function browserStateView_CertStatusToNumber(object: BrowserStateView_CertStatus): number {
  switch (object) {
    case BrowserStateView_CertStatus.UNDEFINED:
      return 0;
    case BrowserStateView_CertStatus.OK:
      return 1;
    case BrowserStateView_CertStatus.CERT_REVOKED:
      return 2;
    default:
      throw new tsProtoGlobalThis.Error("Unrecognized enum value " + object + " for enum BrowserStateView_CertStatus");
  }
}

export const BrowserStateView_MediaState = {
  UNDEFINED_MEDIA: "UNDEFINED_MEDIA",
  pause: "pause",
  play: "play",
} as const;

export type BrowserStateView_MediaState = typeof BrowserStateView_MediaState[keyof typeof BrowserStateView_MediaState];

export function browserStateView_MediaStateFromJSON(object: any): BrowserStateView_MediaState {
  switch (object) {
    case 0:
    case "UNDEFINED_MEDIA":
      return BrowserStateView_MediaState.UNDEFINED_MEDIA;
    case 1:
    case "pause":
      return BrowserStateView_MediaState.pause;
    case 2:
    case "play":
      return BrowserStateView_MediaState.play;
    default:
      throw new tsProtoGlobalThis.Error("Unrecognized enum value " + object + " for enum BrowserStateView_MediaState");
  }
}

export function browserStateView_MediaStateToJSON(object: BrowserStateView_MediaState): string {
  switch (object) {
    case BrowserStateView_MediaState.UNDEFINED_MEDIA:
      return "UNDEFINED_MEDIA";
    case BrowserStateView_MediaState.pause:
      return "pause";
    case BrowserStateView_MediaState.play:
      return "play";
    default:
      throw new tsProtoGlobalThis.Error("Unrecognized enum value " + object + " for enum BrowserStateView_MediaState");
  }
}

export function browserStateView_MediaStateToNumber(object: BrowserStateView_MediaState): number {
  switch (object) {
    case BrowserStateView_MediaState.UNDEFINED_MEDIA:
      return 0;
    case BrowserStateView_MediaState.pause:
      return 1;
    case BrowserStateView_MediaState.play:
      return 2;
    default:
      throw new tsProtoGlobalThis.Error("Unrecognized enum value " + object + " for enum BrowserStateView_MediaState");
  }
}

export interface BrowserCustomCert {
  publicModulus?: string | undefined;
  publicExponent?: string | undefined;
  subject?: BrowserCustomCert_Subject | undefined;
  issuer?: BrowserCustomCert_Issuer | undefined;
  serial?: string | undefined;
  notBefore?: string | undefined;
  notAfter?: string | undefined;
  altNames: string[];
  ocspList: string[];
}

export interface BrowserCustomCert_Subject {
  commonName?: string | undefined;
  countryName?: string | undefined;
  localityName?: string | undefined;
  organizationName?: string | undefined;
  stateOrProvinceName?: string | undefined;
}

export interface BrowserCustomCert_Issuer {
  commonName?: string | undefined;
  countryName?: string | undefined;
  organizationName?: string | undefined;
}

function createBaseBrowserControlMessage(): BrowserControlMessage {
  return { msg: undefined, responseChannel: undefined };
}

export const BrowserControlMessage = {
  encode(message: BrowserControlMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    switch (message.msg?.$case) {
      case "onControlReady":
        BrowserControlReady.encode(message.msg.onControlReady, writer.uint32(10).fork()).ldelim();
        break;
      case "onUrlChange":
        BrowserControlUrlChanged.encode(message.msg.onUrlChange, writer.uint32(18).fork()).ldelim();
        break;
      case "onUrlEnter":
        BrowserControlUrlChanged.encode(message.msg.onUrlEnter, writer.uint32(26).fork()).ldelim();
        break;
      case "onNewTab":
        BrowserControlNewTab.encode(message.msg.onNewTab, writer.uint32(34).fork()).ldelim();
        break;
      case "onSwitchTab":
        BrowserControlTab.encode(message.msg.onSwitchTab, writer.uint32(42).fork()).ldelim();
        break;
      case "onAction":
        BrowserControlAction.encode(message.msg.onAction, writer.uint32(50).fork()).ldelim();
        break;
      case "onPrint":
        BrowserPrintOption.encode(message.msg.onPrint, writer.uint32(58).fork()).ldelim();
        break;
      case "onSave":
        BrowserSavePageOption.encode(message.msg.onSave, writer.uint32(66).fork()).ldelim();
        break;
      case "onCapture":
        BrowserCaptureOption.encode(message.msg.onCapture, writer.uint32(74).fork()).ldelim();
        break;
      case "onSaveDialog":
        BrowserSaveDialogOption.encode(message.msg.onSaveDialog, writer.uint32(82).fork()).ldelim();
        break;
      case "onOpenDialog":
        BrowserOpenDialogOptions.encode(message.msg.onOpenDialog, writer.uint32(90).fork()).ldelim();
        break;
      case "onShowCertDialog":
        BrowserCertificateTrustDialogOptions.encode(message.msg.onShowCertDialog, writer.uint32(98).fork()).ldelim();
        break;
      case "onAudio":
        BrowserControlAudio.encode(message.msg.onAudio, writer.uint32(106).fork()).ldelim();
        break;
      case "onContent":
        BrowserControlContent.encode(message.msg.onContent, writer.uint32(114).fork()).ldelim();
        break;
      case "onDownload":
        BrowserControlDownload.encode(message.msg.onDownload, writer.uint32(122).fork()).ldelim();
        break;
      case "onFind":
        BrowserControlFind.encode(message.msg.onFind, writer.uint32(130).fork()).ldelim();
        break;
      case "onStopFind":
        BrowserControlStopFind.encode(message.msg.onStopFind, writer.uint32(138).fork()).ldelim();
        break;
      case "onCloseTab":
        BrowserControlTab.encode(message.msg.onCloseTab, writer.uint32(146).fork()).ldelim();
        break;
      case "onNewModal":
        BrowserControlNewModal.encode(message.msg.onNewModal, writer.uint32(154).fork()).ldelim();
        break;
      case "onUpdateModal":
        BrowserControlUpdateModal.encode(message.msg.onUpdateModal, writer.uint32(162).fork()).ldelim();
        break;
      case "onCloseModal":
        writer.uint32(168).int32(message.msg.onCloseModal);
        break;
    }
    if (message.responseChannel !== undefined) {
      writer.uint32(802).string(message.responseChannel);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BrowserControlMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBrowserControlMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.msg = {
            $case: "onControlReady",
            onControlReady: BrowserControlReady.decode(reader, reader.uint32()),
          };
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.msg = { $case: "onUrlChange", onUrlChange: BrowserControlUrlChanged.decode(reader, reader.uint32()) };
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.msg = { $case: "onUrlEnter", onUrlEnter: BrowserControlUrlChanged.decode(reader, reader.uint32()) };
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.msg = { $case: "onNewTab", onNewTab: BrowserControlNewTab.decode(reader, reader.uint32()) };
          continue;
        case 5:
          if (tag != 42) {
            break;
          }

          message.msg = { $case: "onSwitchTab", onSwitchTab: BrowserControlTab.decode(reader, reader.uint32()) };
          continue;
        case 6:
          if (tag != 50) {
            break;
          }

          message.msg = { $case: "onAction", onAction: BrowserControlAction.decode(reader, reader.uint32()) };
          continue;
        case 7:
          if (tag != 58) {
            break;
          }

          message.msg = { $case: "onPrint", onPrint: BrowserPrintOption.decode(reader, reader.uint32()) };
          continue;
        case 8:
          if (tag != 66) {
            break;
          }

          message.msg = { $case: "onSave", onSave: BrowserSavePageOption.decode(reader, reader.uint32()) };
          continue;
        case 9:
          if (tag != 74) {
            break;
          }

          message.msg = { $case: "onCapture", onCapture: BrowserCaptureOption.decode(reader, reader.uint32()) };
          continue;
        case 10:
          if (tag != 82) {
            break;
          }

          message.msg = {
            $case: "onSaveDialog",
            onSaveDialog: BrowserSaveDialogOption.decode(reader, reader.uint32()),
          };
          continue;
        case 11:
          if (tag != 90) {
            break;
          }

          message.msg = {
            $case: "onOpenDialog",
            onOpenDialog: BrowserOpenDialogOptions.decode(reader, reader.uint32()),
          };
          continue;
        case 12:
          if (tag != 98) {
            break;
          }

          message.msg = {
            $case: "onShowCertDialog",
            onShowCertDialog: BrowserCertificateTrustDialogOptions.decode(reader, reader.uint32()),
          };
          continue;
        case 13:
          if (tag != 106) {
            break;
          }

          message.msg = { $case: "onAudio", onAudio: BrowserControlAudio.decode(reader, reader.uint32()) };
          continue;
        case 14:
          if (tag != 114) {
            break;
          }

          message.msg = { $case: "onContent", onContent: BrowserControlContent.decode(reader, reader.uint32()) };
          continue;
        case 15:
          if (tag != 122) {
            break;
          }

          message.msg = { $case: "onDownload", onDownload: BrowserControlDownload.decode(reader, reader.uint32()) };
          continue;
        case 16:
          if (tag != 130) {
            break;
          }

          message.msg = { $case: "onFind", onFind: BrowserControlFind.decode(reader, reader.uint32()) };
          continue;
        case 17:
          if (tag != 138) {
            break;
          }

          message.msg = { $case: "onStopFind", onStopFind: BrowserControlStopFind.decode(reader, reader.uint32()) };
          continue;
        case 18:
          if (tag != 146) {
            break;
          }

          message.msg = { $case: "onCloseTab", onCloseTab: BrowserControlTab.decode(reader, reader.uint32()) };
          continue;
        case 19:
          if (tag != 154) {
            break;
          }

          message.msg = { $case: "onNewModal", onNewModal: BrowserControlNewModal.decode(reader, reader.uint32()) };
          continue;
        case 20:
          if (tag != 162) {
            break;
          }

          message.msg = {
            $case: "onUpdateModal",
            onUpdateModal: BrowserControlUpdateModal.decode(reader, reader.uint32()),
          };
          continue;
        case 21:
          if (tag != 168) {
            break;
          }

          message.msg = { $case: "onCloseModal", onCloseModal: reader.int32() };
          continue;
        case 100:
          if (tag != 802) {
            break;
          }

          message.responseChannel = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BrowserControlMessage {
    return {
      msg: isSet(object.onControlReady)
        ? { $case: "onControlReady", onControlReady: BrowserControlReady.fromJSON(object.onControlReady) }
        : isSet(object.onUrlChange)
        ? { $case: "onUrlChange", onUrlChange: BrowserControlUrlChanged.fromJSON(object.onUrlChange) }
        : isSet(object.onUrlEnter)
        ? { $case: "onUrlEnter", onUrlEnter: BrowserControlUrlChanged.fromJSON(object.onUrlEnter) }
        : isSet(object.onNewTab)
        ? { $case: "onNewTab", onNewTab: BrowserControlNewTab.fromJSON(object.onNewTab) }
        : isSet(object.onSwitchTab)
        ? { $case: "onSwitchTab", onSwitchTab: BrowserControlTab.fromJSON(object.onSwitchTab) }
        : isSet(object.onAction)
        ? { $case: "onAction", onAction: BrowserControlAction.fromJSON(object.onAction) }
        : isSet(object.onPrint)
        ? { $case: "onPrint", onPrint: BrowserPrintOption.fromJSON(object.onPrint) }
        : isSet(object.onSave)
        ? { $case: "onSave", onSave: BrowserSavePageOption.fromJSON(object.onSave) }
        : isSet(object.onCapture)
        ? { $case: "onCapture", onCapture: BrowserCaptureOption.fromJSON(object.onCapture) }
        : isSet(object.onSaveDialog)
        ? { $case: "onSaveDialog", onSaveDialog: BrowserSaveDialogOption.fromJSON(object.onSaveDialog) }
        : isSet(object.onOpenDialog)
        ? { $case: "onOpenDialog", onOpenDialog: BrowserOpenDialogOptions.fromJSON(object.onOpenDialog) }
        : isSet(object.onShowCertDialog)
        ? {
          $case: "onShowCertDialog",
          onShowCertDialog: BrowserCertificateTrustDialogOptions.fromJSON(object.onShowCertDialog),
        }
        : isSet(object.onAudio)
        ? { $case: "onAudio", onAudio: BrowserControlAudio.fromJSON(object.onAudio) }
        : isSet(object.onContent)
        ? { $case: "onContent", onContent: BrowserControlContent.fromJSON(object.onContent) }
        : isSet(object.onDownload)
        ? { $case: "onDownload", onDownload: BrowserControlDownload.fromJSON(object.onDownload) }
        : isSet(object.onFind)
        ? { $case: "onFind", onFind: BrowserControlFind.fromJSON(object.onFind) }
        : isSet(object.onStopFind)
        ? { $case: "onStopFind", onStopFind: BrowserControlStopFind.fromJSON(object.onStopFind) }
        : isSet(object.onCloseTab)
        ? { $case: "onCloseTab", onCloseTab: BrowserControlTab.fromJSON(object.onCloseTab) }
        : isSet(object.onNewModal)
        ? { $case: "onNewModal", onNewModal: BrowserControlNewModal.fromJSON(object.onNewModal) }
        : isSet(object.onUpdateModal)
        ? { $case: "onUpdateModal", onUpdateModal: BrowserControlUpdateModal.fromJSON(object.onUpdateModal) }
        : isSet(object.onCloseModal)
        ? { $case: "onCloseModal", onCloseModal: Number(object.onCloseModal) }
        : undefined,
      responseChannel: isSet(object.responseChannel) ? String(object.responseChannel) : undefined,
    };
  },

  toJSON(message: BrowserControlMessage): unknown {
    const obj: any = {};
    message.msg?.$case === "onControlReady" && (obj.onControlReady = message.msg?.onControlReady
      ? BrowserControlReady.toJSON(message.msg?.onControlReady)
      : undefined);
    message.msg?.$case === "onUrlChange" && (obj.onUrlChange = message.msg?.onUrlChange
      ? BrowserControlUrlChanged.toJSON(message.msg?.onUrlChange)
      : undefined);
    message.msg?.$case === "onUrlEnter" &&
      (obj.onUrlEnter = message.msg?.onUrlEnter ? BrowserControlUrlChanged.toJSON(message.msg?.onUrlEnter) : undefined);
    message.msg?.$case === "onNewTab" &&
      (obj.onNewTab = message.msg?.onNewTab ? BrowserControlNewTab.toJSON(message.msg?.onNewTab) : undefined);
    message.msg?.$case === "onSwitchTab" &&
      (obj.onSwitchTab = message.msg?.onSwitchTab ? BrowserControlTab.toJSON(message.msg?.onSwitchTab) : undefined);
    message.msg?.$case === "onAction" &&
      (obj.onAction = message.msg?.onAction ? BrowserControlAction.toJSON(message.msg?.onAction) : undefined);
    message.msg?.$case === "onPrint" &&
      (obj.onPrint = message.msg?.onPrint ? BrowserPrintOption.toJSON(message.msg?.onPrint) : undefined);
    message.msg?.$case === "onSave" &&
      (obj.onSave = message.msg?.onSave ? BrowserSavePageOption.toJSON(message.msg?.onSave) : undefined);
    message.msg?.$case === "onCapture" &&
      (obj.onCapture = message.msg?.onCapture ? BrowserCaptureOption.toJSON(message.msg?.onCapture) : undefined);
    message.msg?.$case === "onSaveDialog" && (obj.onSaveDialog = message.msg?.onSaveDialog
      ? BrowserSaveDialogOption.toJSON(message.msg?.onSaveDialog)
      : undefined);
    message.msg?.$case === "onOpenDialog" && (obj.onOpenDialog = message.msg?.onOpenDialog
      ? BrowserOpenDialogOptions.toJSON(message.msg?.onOpenDialog)
      : undefined);
    message.msg?.$case === "onShowCertDialog" && (obj.onShowCertDialog = message.msg?.onShowCertDialog
      ? BrowserCertificateTrustDialogOptions.toJSON(message.msg?.onShowCertDialog)
      : undefined);
    message.msg?.$case === "onAudio" &&
      (obj.onAudio = message.msg?.onAudio ? BrowserControlAudio.toJSON(message.msg?.onAudio) : undefined);
    message.msg?.$case === "onContent" &&
      (obj.onContent = message.msg?.onContent ? BrowserControlContent.toJSON(message.msg?.onContent) : undefined);
    message.msg?.$case === "onDownload" &&
      (obj.onDownload = message.msg?.onDownload ? BrowserControlDownload.toJSON(message.msg?.onDownload) : undefined);
    message.msg?.$case === "onFind" &&
      (obj.onFind = message.msg?.onFind ? BrowserControlFind.toJSON(message.msg?.onFind) : undefined);
    message.msg?.$case === "onStopFind" &&
      (obj.onStopFind = message.msg?.onStopFind ? BrowserControlStopFind.toJSON(message.msg?.onStopFind) : undefined);
    message.msg?.$case === "onCloseTab" &&
      (obj.onCloseTab = message.msg?.onCloseTab ? BrowserControlTab.toJSON(message.msg?.onCloseTab) : undefined);
    message.msg?.$case === "onNewModal" &&
      (obj.onNewModal = message.msg?.onNewModal ? BrowserControlNewModal.toJSON(message.msg?.onNewModal) : undefined);
    message.msg?.$case === "onUpdateModal" && (obj.onUpdateModal = message.msg?.onUpdateModal
      ? BrowserControlUpdateModal.toJSON(message.msg?.onUpdateModal)
      : undefined);
    message.msg?.$case === "onCloseModal" && (obj.onCloseModal = Math.round(message.msg?.onCloseModal));
    message.responseChannel !== undefined && (obj.responseChannel = message.responseChannel);
    return obj;
  },

  create<I extends Exact<DeepPartial<BrowserControlMessage>, I>>(base?: I): BrowserControlMessage {
    return BrowserControlMessage.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BrowserControlMessage>, I>>(object: I): BrowserControlMessage {
    const message = createBaseBrowserControlMessage();
    if (
      object.msg?.$case === "onControlReady" &&
      object.msg?.onControlReady !== undefined &&
      object.msg?.onControlReady !== null
    ) {
      message.msg = {
        $case: "onControlReady",
        onControlReady: BrowserControlReady.fromPartial(object.msg.onControlReady),
      };
    }
    if (
      object.msg?.$case === "onUrlChange" && object.msg?.onUrlChange !== undefined && object.msg?.onUrlChange !== null
    ) {
      message.msg = { $case: "onUrlChange", onUrlChange: BrowserControlUrlChanged.fromPartial(object.msg.onUrlChange) };
    }
    if (object.msg?.$case === "onUrlEnter" && object.msg?.onUrlEnter !== undefined && object.msg?.onUrlEnter !== null) {
      message.msg = { $case: "onUrlEnter", onUrlEnter: BrowserControlUrlChanged.fromPartial(object.msg.onUrlEnter) };
    }
    if (object.msg?.$case === "onNewTab" && object.msg?.onNewTab !== undefined && object.msg?.onNewTab !== null) {
      message.msg = { $case: "onNewTab", onNewTab: BrowserControlNewTab.fromPartial(object.msg.onNewTab) };
    }
    if (
      object.msg?.$case === "onSwitchTab" && object.msg?.onSwitchTab !== undefined && object.msg?.onSwitchTab !== null
    ) {
      message.msg = { $case: "onSwitchTab", onSwitchTab: BrowserControlTab.fromPartial(object.msg.onSwitchTab) };
    }
    if (object.msg?.$case === "onAction" && object.msg?.onAction !== undefined && object.msg?.onAction !== null) {
      message.msg = { $case: "onAction", onAction: BrowserControlAction.fromPartial(object.msg.onAction) };
    }
    if (object.msg?.$case === "onPrint" && object.msg?.onPrint !== undefined && object.msg?.onPrint !== null) {
      message.msg = { $case: "onPrint", onPrint: BrowserPrintOption.fromPartial(object.msg.onPrint) };
    }
    if (object.msg?.$case === "onSave" && object.msg?.onSave !== undefined && object.msg?.onSave !== null) {
      message.msg = { $case: "onSave", onSave: BrowserSavePageOption.fromPartial(object.msg.onSave) };
    }
    if (object.msg?.$case === "onCapture" && object.msg?.onCapture !== undefined && object.msg?.onCapture !== null) {
      message.msg = { $case: "onCapture", onCapture: BrowserCaptureOption.fromPartial(object.msg.onCapture) };
    }
    if (
      object.msg?.$case === "onSaveDialog" &&
      object.msg?.onSaveDialog !== undefined &&
      object.msg?.onSaveDialog !== null
    ) {
      message.msg = {
        $case: "onSaveDialog",
        onSaveDialog: BrowserSaveDialogOption.fromPartial(object.msg.onSaveDialog),
      };
    }
    if (
      object.msg?.$case === "onOpenDialog" &&
      object.msg?.onOpenDialog !== undefined &&
      object.msg?.onOpenDialog !== null
    ) {
      message.msg = {
        $case: "onOpenDialog",
        onOpenDialog: BrowserOpenDialogOptions.fromPartial(object.msg.onOpenDialog),
      };
    }
    if (
      object.msg?.$case === "onShowCertDialog" &&
      object.msg?.onShowCertDialog !== undefined &&
      object.msg?.onShowCertDialog !== null
    ) {
      message.msg = {
        $case: "onShowCertDialog",
        onShowCertDialog: BrowserCertificateTrustDialogOptions.fromPartial(object.msg.onShowCertDialog),
      };
    }
    if (object.msg?.$case === "onAudio" && object.msg?.onAudio !== undefined && object.msg?.onAudio !== null) {
      message.msg = { $case: "onAudio", onAudio: BrowserControlAudio.fromPartial(object.msg.onAudio) };
    }
    if (object.msg?.$case === "onContent" && object.msg?.onContent !== undefined && object.msg?.onContent !== null) {
      message.msg = { $case: "onContent", onContent: BrowserControlContent.fromPartial(object.msg.onContent) };
    }
    if (object.msg?.$case === "onDownload" && object.msg?.onDownload !== undefined && object.msg?.onDownload !== null) {
      message.msg = { $case: "onDownload", onDownload: BrowserControlDownload.fromPartial(object.msg.onDownload) };
    }
    if (object.msg?.$case === "onFind" && object.msg?.onFind !== undefined && object.msg?.onFind !== null) {
      message.msg = { $case: "onFind", onFind: BrowserControlFind.fromPartial(object.msg.onFind) };
    }
    if (object.msg?.$case === "onStopFind" && object.msg?.onStopFind !== undefined && object.msg?.onStopFind !== null) {
      message.msg = { $case: "onStopFind", onStopFind: BrowserControlStopFind.fromPartial(object.msg.onStopFind) };
    }
    if (object.msg?.$case === "onCloseTab" && object.msg?.onCloseTab !== undefined && object.msg?.onCloseTab !== null) {
      message.msg = { $case: "onCloseTab", onCloseTab: BrowserControlTab.fromPartial(object.msg.onCloseTab) };
    }
    if (object.msg?.$case === "onNewModal" && object.msg?.onNewModal !== undefined && object.msg?.onNewModal !== null) {
      message.msg = { $case: "onNewModal", onNewModal: BrowserControlNewModal.fromPartial(object.msg.onNewModal) };
    }
    if (
      object.msg?.$case === "onUpdateModal" &&
      object.msg?.onUpdateModal !== undefined &&
      object.msg?.onUpdateModal !== null
    ) {
      message.msg = {
        $case: "onUpdateModal",
        onUpdateModal: BrowserControlUpdateModal.fromPartial(object.msg.onUpdateModal),
      };
    }
    if (
      object.msg?.$case === "onCloseModal" &&
      object.msg?.onCloseModal !== undefined &&
      object.msg?.onCloseModal !== null
    ) {
      message.msg = { $case: "onCloseModal", onCloseModal: object.msg.onCloseModal };
    }
    message.responseChannel = object.responseChannel ?? undefined;
    return message;
  },
};

function createBaseBrowserControlResponse(): BrowserControlResponse {
  return { msg: undefined };
}

export const BrowserControlResponse = {
  encode(message: BrowserControlResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    switch (message.msg?.$case) {
      case "onCapture":
        BrowserCaptureResponse.encode(message.msg.onCapture, writer.uint32(10).fork()).ldelim();
        break;
      case "onSaveDialog":
        BrowserSaveDialogReturnValue.encode(message.msg.onSaveDialog, writer.uint32(18).fork()).ldelim();
        break;
      case "onOpenDialog":
        BrowserOpenDialogReturnValue.encode(message.msg.onOpenDialog, writer.uint32(26).fork()).ldelim();
        break;
      case "onShowCertificate":
        writer.uint32(32).bool(message.msg.onShowCertificate);
        break;
      case "onFind":
        BrowserFindResponse.encode(message.msg.onFind, writer.uint32(42).fork()).ldelim();
        break;
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BrowserControlResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBrowserControlResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.msg = { $case: "onCapture", onCapture: BrowserCaptureResponse.decode(reader, reader.uint32()) };
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.msg = {
            $case: "onSaveDialog",
            onSaveDialog: BrowserSaveDialogReturnValue.decode(reader, reader.uint32()),
          };
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.msg = {
            $case: "onOpenDialog",
            onOpenDialog: BrowserOpenDialogReturnValue.decode(reader, reader.uint32()),
          };
          continue;
        case 4:
          if (tag != 32) {
            break;
          }

          message.msg = { $case: "onShowCertificate", onShowCertificate: reader.bool() };
          continue;
        case 5:
          if (tag != 42) {
            break;
          }

          message.msg = { $case: "onFind", onFind: BrowserFindResponse.decode(reader, reader.uint32()) };
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BrowserControlResponse {
    return {
      msg: isSet(object.onCapture)
        ? { $case: "onCapture", onCapture: BrowserCaptureResponse.fromJSON(object.onCapture) }
        : isSet(object.onSaveDialog)
        ? { $case: "onSaveDialog", onSaveDialog: BrowserSaveDialogReturnValue.fromJSON(object.onSaveDialog) }
        : isSet(object.onOpenDialog)
        ? { $case: "onOpenDialog", onOpenDialog: BrowserOpenDialogReturnValue.fromJSON(object.onOpenDialog) }
        : isSet(object.onShowCertificate)
        ? { $case: "onShowCertificate", onShowCertificate: Boolean(object.onShowCertificate) }
        : isSet(object.onFind)
        ? { $case: "onFind", onFind: BrowserFindResponse.fromJSON(object.onFind) }
        : undefined,
    };
  },

  toJSON(message: BrowserControlResponse): unknown {
    const obj: any = {};
    message.msg?.$case === "onCapture" &&
      (obj.onCapture = message.msg?.onCapture ? BrowserCaptureResponse.toJSON(message.msg?.onCapture) : undefined);
    message.msg?.$case === "onSaveDialog" && (obj.onSaveDialog = message.msg?.onSaveDialog
      ? BrowserSaveDialogReturnValue.toJSON(message.msg?.onSaveDialog)
      : undefined);
    message.msg?.$case === "onOpenDialog" && (obj.onOpenDialog = message.msg?.onOpenDialog
      ? BrowserOpenDialogReturnValue.toJSON(message.msg?.onOpenDialog)
      : undefined);
    message.msg?.$case === "onShowCertificate" && (obj.onShowCertificate = message.msg?.onShowCertificate);
    message.msg?.$case === "onFind" &&
      (obj.onFind = message.msg?.onFind ? BrowserFindResponse.toJSON(message.msg?.onFind) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<BrowserControlResponse>, I>>(base?: I): BrowserControlResponse {
    return BrowserControlResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BrowserControlResponse>, I>>(object: I): BrowserControlResponse {
    const message = createBaseBrowserControlResponse();
    if (object.msg?.$case === "onCapture" && object.msg?.onCapture !== undefined && object.msg?.onCapture !== null) {
      message.msg = { $case: "onCapture", onCapture: BrowserCaptureResponse.fromPartial(object.msg.onCapture) };
    }
    if (
      object.msg?.$case === "onSaveDialog" &&
      object.msg?.onSaveDialog !== undefined &&
      object.msg?.onSaveDialog !== null
    ) {
      message.msg = {
        $case: "onSaveDialog",
        onSaveDialog: BrowserSaveDialogReturnValue.fromPartial(object.msg.onSaveDialog),
      };
    }
    if (
      object.msg?.$case === "onOpenDialog" &&
      object.msg?.onOpenDialog !== undefined &&
      object.msg?.onOpenDialog !== null
    ) {
      message.msg = {
        $case: "onOpenDialog",
        onOpenDialog: BrowserOpenDialogReturnValue.fromPartial(object.msg.onOpenDialog),
      };
    }
    if (
      object.msg?.$case === "onShowCertificate" &&
      object.msg?.onShowCertificate !== undefined &&
      object.msg?.onShowCertificate !== null
    ) {
      message.msg = { $case: "onShowCertificate", onShowCertificate: object.msg.onShowCertificate };
    }
    if (object.msg?.$case === "onFind" && object.msg?.onFind !== undefined && object.msg?.onFind !== null) {
      message.msg = { $case: "onFind", onFind: BrowserFindResponse.fromPartial(object.msg.onFind) };
    }
    return message;
  },
};

function createBaseBrowserCaptureResponse(): BrowserCaptureResponse {
  return { url: "" };
}

export const BrowserCaptureResponse = {
  encode(message: BrowserCaptureResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.url !== "") {
      writer.uint32(10).string(message.url);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BrowserCaptureResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBrowserCaptureResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.url = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BrowserCaptureResponse {
    return { url: isSet(object.url) ? String(object.url) : "" };
  },

  toJSON(message: BrowserCaptureResponse): unknown {
    const obj: any = {};
    message.url !== undefined && (obj.url = message.url);
    return obj;
  },

  create<I extends Exact<DeepPartial<BrowserCaptureResponse>, I>>(base?: I): BrowserCaptureResponse {
    return BrowserCaptureResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BrowserCaptureResponse>, I>>(object: I): BrowserCaptureResponse {
    const message = createBaseBrowserCaptureResponse();
    message.url = object.url ?? "";
    return message;
  },
};

function createBaseBrowserFindResponse(): BrowserFindResponse {
  return { requestId: undefined };
}

export const BrowserFindResponse = {
  encode(message: BrowserFindResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.requestId !== undefined) {
      writer.uint32(8).int32(message.requestId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BrowserFindResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBrowserFindResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 8) {
            break;
          }

          message.requestId = reader.int32();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BrowserFindResponse {
    return { requestId: isSet(object.requestId) ? Number(object.requestId) : undefined };
  },

  toJSON(message: BrowserFindResponse): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = Math.round(message.requestId));
    return obj;
  },

  create<I extends Exact<DeepPartial<BrowserFindResponse>, I>>(base?: I): BrowserFindResponse {
    return BrowserFindResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BrowserFindResponse>, I>>(object: I): BrowserFindResponse {
    const message = createBaseBrowserFindResponse();
    message.requestId = object.requestId ?? undefined;
    return message;
  },
};

function createBaseBrowserSaveDialogReturnValue(): BrowserSaveDialogReturnValue {
  return { canceled: false, filePath: undefined, bookmark: undefined };
}

export const BrowserSaveDialogReturnValue = {
  encode(message: BrowserSaveDialogReturnValue, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.canceled === true) {
      writer.uint32(8).bool(message.canceled);
    }
    if (message.filePath !== undefined) {
      writer.uint32(18).string(message.filePath);
    }
    if (message.bookmark !== undefined) {
      writer.uint32(26).string(message.bookmark);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BrowserSaveDialogReturnValue {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBrowserSaveDialogReturnValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 8) {
            break;
          }

          message.canceled = reader.bool();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.filePath = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.bookmark = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BrowserSaveDialogReturnValue {
    return {
      canceled: isSet(object.canceled) ? Boolean(object.canceled) : false,
      filePath: isSet(object.filePath) ? String(object.filePath) : undefined,
      bookmark: isSet(object.bookmark) ? String(object.bookmark) : undefined,
    };
  },

  toJSON(message: BrowserSaveDialogReturnValue): unknown {
    const obj: any = {};
    message.canceled !== undefined && (obj.canceled = message.canceled);
    message.filePath !== undefined && (obj.filePath = message.filePath);
    message.bookmark !== undefined && (obj.bookmark = message.bookmark);
    return obj;
  },

  create<I extends Exact<DeepPartial<BrowserSaveDialogReturnValue>, I>>(base?: I): BrowserSaveDialogReturnValue {
    return BrowserSaveDialogReturnValue.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BrowserSaveDialogReturnValue>, I>>(object: I): BrowserSaveDialogReturnValue {
    const message = createBaseBrowserSaveDialogReturnValue();
    message.canceled = object.canceled ?? false;
    message.filePath = object.filePath ?? undefined;
    message.bookmark = object.bookmark ?? undefined;
    return message;
  },
};

function createBaseBrowserOpenDialogReturnValue(): BrowserOpenDialogReturnValue {
  return { canceled: false, filePaths: [], bookmarks: [] };
}

export const BrowserOpenDialogReturnValue = {
  encode(message: BrowserOpenDialogReturnValue, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.canceled === true) {
      writer.uint32(8).bool(message.canceled);
    }
    for (const v of message.filePaths) {
      writer.uint32(18).string(v!);
    }
    for (const v of message.bookmarks) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BrowserOpenDialogReturnValue {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBrowserOpenDialogReturnValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 8) {
            break;
          }

          message.canceled = reader.bool();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.filePaths.push(reader.string());
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.bookmarks.push(reader.string());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BrowserOpenDialogReturnValue {
    return {
      canceled: isSet(object.canceled) ? Boolean(object.canceled) : false,
      filePaths: Array.isArray(object?.filePaths) ? object.filePaths.map((e: any) => String(e)) : [],
      bookmarks: Array.isArray(object?.bookmarks) ? object.bookmarks.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: BrowserOpenDialogReturnValue): unknown {
    const obj: any = {};
    message.canceled !== undefined && (obj.canceled = message.canceled);
    if (message.filePaths) {
      obj.filePaths = message.filePaths.map((e) => e);
    } else {
      obj.filePaths = [];
    }
    if (message.bookmarks) {
      obj.bookmarks = message.bookmarks.map((e) => e);
    } else {
      obj.bookmarks = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BrowserOpenDialogReturnValue>, I>>(base?: I): BrowserOpenDialogReturnValue {
    return BrowserOpenDialogReturnValue.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BrowserOpenDialogReturnValue>, I>>(object: I): BrowserOpenDialogReturnValue {
    const message = createBaseBrowserOpenDialogReturnValue();
    message.canceled = object.canceled ?? false;
    message.filePaths = object.filePaths?.map((e) => e) || [];
    message.bookmarks = object.bookmarks?.map((e) => e) || [];
    return message;
  },
};

function createBaseBrowserControlReady(): BrowserControlReady {
  return { jsAttached: [] };
}

export const BrowserControlReady = {
  encode(message: BrowserControlReady, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.jsAttached) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BrowserControlReady {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBrowserControlReady();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.jsAttached.push(reader.string());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BrowserControlReady {
    return { jsAttached: Array.isArray(object?.jsAttached) ? object.jsAttached.map((e: any) => String(e)) : [] };
  },

  toJSON(message: BrowserControlReady): unknown {
    const obj: any = {};
    if (message.jsAttached) {
      obj.jsAttached = message.jsAttached.map((e) => e);
    } else {
      obj.jsAttached = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BrowserControlReady>, I>>(base?: I): BrowserControlReady {
    return BrowserControlReady.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BrowserControlReady>, I>>(object: I): BrowserControlReady {
    const message = createBaseBrowserControlReady();
    message.jsAttached = object.jsAttached?.map((e) => e) || [];
    return message;
  },
};

function createBaseBrowserControlUrlChanged(): BrowserControlUrlChanged {
  return { url: "" };
}

export const BrowserControlUrlChanged = {
  encode(message: BrowserControlUrlChanged, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.url !== "") {
      writer.uint32(10).string(message.url);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BrowserControlUrlChanged {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBrowserControlUrlChanged();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.url = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BrowserControlUrlChanged {
    return { url: isSet(object.url) ? String(object.url) : "" };
  },

  toJSON(message: BrowserControlUrlChanged): unknown {
    const obj: any = {};
    message.url !== undefined && (obj.url = message.url);
    return obj;
  },

  create<I extends Exact<DeepPartial<BrowserControlUrlChanged>, I>>(base?: I): BrowserControlUrlChanged {
    return BrowserControlUrlChanged.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BrowserControlUrlChanged>, I>>(object: I): BrowserControlUrlChanged {
    const message = createBaseBrowserControlUrlChanged();
    message.url = object.url ?? "";
    return message;
  },
};

function createBaseBrowserControlNewTab(): BrowserControlNewTab {
  return { url: "", partition: undefined, devTools: undefined, ifNoViews: undefined, hideNavbar: undefined };
}

export const BrowserControlNewTab = {
  encode(message: BrowserControlNewTab, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.url !== "") {
      writer.uint32(10).string(message.url);
    }
    if (message.partition !== undefined) {
      writer.uint32(18).string(message.partition);
    }
    if (message.devTools !== undefined) {
      writer.uint32(24).bool(message.devTools);
    }
    if (message.ifNoViews !== undefined) {
      writer.uint32(32).bool(message.ifNoViews);
    }
    if (message.hideNavbar !== undefined) {
      writer.uint32(40).bool(message.hideNavbar);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BrowserControlNewTab {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBrowserControlNewTab();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.url = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.partition = reader.string();
          continue;
        case 3:
          if (tag != 24) {
            break;
          }

          message.devTools = reader.bool();
          continue;
        case 4:
          if (tag != 32) {
            break;
          }

          message.ifNoViews = reader.bool();
          continue;
        case 5:
          if (tag != 40) {
            break;
          }

          message.hideNavbar = reader.bool();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BrowserControlNewTab {
    return {
      url: isSet(object.url) ? String(object.url) : "",
      partition: isSet(object.partition) ? String(object.partition) : undefined,
      devTools: isSet(object.devTools) ? Boolean(object.devTools) : undefined,
      ifNoViews: isSet(object.ifNoViews) ? Boolean(object.ifNoViews) : undefined,
      hideNavbar: isSet(object.hideNavbar) ? Boolean(object.hideNavbar) : undefined,
    };
  },

  toJSON(message: BrowserControlNewTab): unknown {
    const obj: any = {};
    message.url !== undefined && (obj.url = message.url);
    message.partition !== undefined && (obj.partition = message.partition);
    message.devTools !== undefined && (obj.devTools = message.devTools);
    message.ifNoViews !== undefined && (obj.ifNoViews = message.ifNoViews);
    message.hideNavbar !== undefined && (obj.hideNavbar = message.hideNavbar);
    return obj;
  },

  create<I extends Exact<DeepPartial<BrowserControlNewTab>, I>>(base?: I): BrowserControlNewTab {
    return BrowserControlNewTab.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BrowserControlNewTab>, I>>(object: I): BrowserControlNewTab {
    const message = createBaseBrowserControlNewTab();
    message.url = object.url ?? "";
    message.partition = object.partition ?? undefined;
    message.devTools = object.devTools ?? undefined;
    message.ifNoViews = object.ifNoViews ?? undefined;
    message.hideNavbar = object.hideNavbar ?? undefined;
    return message;
  },
};

function createBaseBrowserControlUpdateModal(): BrowserControlUpdateModal {
  return { opts: undefined, id: 0 };
}

export const BrowserControlUpdateModal = {
  encode(message: BrowserControlUpdateModal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.opts !== undefined) {
      BrowserControlNewModal.encode(message.opts, writer.uint32(10).fork()).ldelim();
    }
    if (message.id !== 0) {
      writer.uint32(16).int32(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BrowserControlUpdateModal {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBrowserControlUpdateModal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.opts = BrowserControlNewModal.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag != 16) {
            break;
          }

          message.id = reader.int32();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BrowserControlUpdateModal {
    return {
      opts: isSet(object.opts) ? BrowserControlNewModal.fromJSON(object.opts) : undefined,
      id: isSet(object.id) ? Number(object.id) : 0,
    };
  },

  toJSON(message: BrowserControlUpdateModal): unknown {
    const obj: any = {};
    message.opts !== undefined && (obj.opts = message.opts ? BrowserControlNewModal.toJSON(message.opts) : undefined);
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  create<I extends Exact<DeepPartial<BrowserControlUpdateModal>, I>>(base?: I): BrowserControlUpdateModal {
    return BrowserControlUpdateModal.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BrowserControlUpdateModal>, I>>(object: I): BrowserControlUpdateModal {
    const message = createBaseBrowserControlUpdateModal();
    message.opts = (object.opts !== undefined && object.opts !== null)
      ? BrowserControlNewModal.fromPartial(object.opts)
      : undefined;
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseBrowserControlNewModal(): BrowserControlNewModal {
  return {
    width: undefined,
    height: undefined,
    x: undefined,
    y: undefined,
    useContentSize: undefined,
    center: undefined,
    minWidth: undefined,
    minHeight: undefined,
    maxWidth: undefined,
    maxHeight: undefined,
    alwaysOnTop: undefined,
    show: undefined,
    backgroundColor: undefined,
    opacity: undefined,
    transparent: undefined,
    modal: undefined,
    hasShadow: undefined,
    xFromRight: undefined,
    yFromBottom: undefined,
    url: "",
  };
}

export const BrowserControlNewModal = {
  encode(message: BrowserControlNewModal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.width !== undefined) {
      writer.uint32(8).int32(message.width);
    }
    if (message.height !== undefined) {
      writer.uint32(16).int32(message.height);
    }
    if (message.x !== undefined) {
      writer.uint32(24).int32(message.x);
    }
    if (message.y !== undefined) {
      writer.uint32(32).int32(message.y);
    }
    if (message.useContentSize !== undefined) {
      writer.uint32(40).bool(message.useContentSize);
    }
    if (message.center !== undefined) {
      writer.uint32(48).bool(message.center);
    }
    if (message.minWidth !== undefined) {
      writer.uint32(56).int32(message.minWidth);
    }
    if (message.minHeight !== undefined) {
      writer.uint32(64).int32(message.minHeight);
    }
    if (message.maxWidth !== undefined) {
      writer.uint32(72).int32(message.maxWidth);
    }
    if (message.maxHeight !== undefined) {
      writer.uint32(80).int32(message.maxHeight);
    }
    if (message.alwaysOnTop !== undefined) {
      writer.uint32(88).bool(message.alwaysOnTop);
    }
    if (message.show !== undefined) {
      writer.uint32(96).bool(message.show);
    }
    if (message.backgroundColor !== undefined) {
      writer.uint32(106).string(message.backgroundColor);
    }
    if (message.opacity !== undefined) {
      writer.uint32(112).int32(message.opacity);
    }
    if (message.transparent !== undefined) {
      writer.uint32(120).bool(message.transparent);
    }
    if (message.modal !== undefined) {
      writer.uint32(128).bool(message.modal);
    }
    if (message.hasShadow !== undefined) {
      writer.uint32(136).bool(message.hasShadow);
    }
    if (message.xFromRight !== undefined) {
      writer.uint32(144).bool(message.xFromRight);
    }
    if (message.yFromBottom !== undefined) {
      writer.uint32(152).bool(message.yFromBottom);
    }
    if (message.url !== "") {
      writer.uint32(242).string(message.url);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BrowserControlNewModal {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBrowserControlNewModal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 8) {
            break;
          }

          message.width = reader.int32();
          continue;
        case 2:
          if (tag != 16) {
            break;
          }

          message.height = reader.int32();
          continue;
        case 3:
          if (tag != 24) {
            break;
          }

          message.x = reader.int32();
          continue;
        case 4:
          if (tag != 32) {
            break;
          }

          message.y = reader.int32();
          continue;
        case 5:
          if (tag != 40) {
            break;
          }

          message.useContentSize = reader.bool();
          continue;
        case 6:
          if (tag != 48) {
            break;
          }

          message.center = reader.bool();
          continue;
        case 7:
          if (tag != 56) {
            break;
          }

          message.minWidth = reader.int32();
          continue;
        case 8:
          if (tag != 64) {
            break;
          }

          message.minHeight = reader.int32();
          continue;
        case 9:
          if (tag != 72) {
            break;
          }

          message.maxWidth = reader.int32();
          continue;
        case 10:
          if (tag != 80) {
            break;
          }

          message.maxHeight = reader.int32();
          continue;
        case 11:
          if (tag != 88) {
            break;
          }

          message.alwaysOnTop = reader.bool();
          continue;
        case 12:
          if (tag != 96) {
            break;
          }

          message.show = reader.bool();
          continue;
        case 13:
          if (tag != 106) {
            break;
          }

          message.backgroundColor = reader.string();
          continue;
        case 14:
          if (tag != 112) {
            break;
          }

          message.opacity = reader.int32();
          continue;
        case 15:
          if (tag != 120) {
            break;
          }

          message.transparent = reader.bool();
          continue;
        case 16:
          if (tag != 128) {
            break;
          }

          message.modal = reader.bool();
          continue;
        case 17:
          if (tag != 136) {
            break;
          }

          message.hasShadow = reader.bool();
          continue;
        case 18:
          if (tag != 144) {
            break;
          }

          message.xFromRight = reader.bool();
          continue;
        case 19:
          if (tag != 152) {
            break;
          }

          message.yFromBottom = reader.bool();
          continue;
        case 30:
          if (tag != 242) {
            break;
          }

          message.url = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BrowserControlNewModal {
    return {
      width: isSet(object.width) ? Number(object.width) : undefined,
      height: isSet(object.height) ? Number(object.height) : undefined,
      x: isSet(object.x) ? Number(object.x) : undefined,
      y: isSet(object.y) ? Number(object.y) : undefined,
      useContentSize: isSet(object.useContentSize) ? Boolean(object.useContentSize) : undefined,
      center: isSet(object.center) ? Boolean(object.center) : undefined,
      minWidth: isSet(object.minWidth) ? Number(object.minWidth) : undefined,
      minHeight: isSet(object.minHeight) ? Number(object.minHeight) : undefined,
      maxWidth: isSet(object.maxWidth) ? Number(object.maxWidth) : undefined,
      maxHeight: isSet(object.maxHeight) ? Number(object.maxHeight) : undefined,
      alwaysOnTop: isSet(object.alwaysOnTop) ? Boolean(object.alwaysOnTop) : undefined,
      show: isSet(object.show) ? Boolean(object.show) : undefined,
      backgroundColor: isSet(object.backgroundColor) ? String(object.backgroundColor) : undefined,
      opacity: isSet(object.opacity) ? Number(object.opacity) : undefined,
      transparent: isSet(object.transparent) ? Boolean(object.transparent) : undefined,
      modal: isSet(object.modal) ? Boolean(object.modal) : undefined,
      hasShadow: isSet(object.hasShadow) ? Boolean(object.hasShadow) : undefined,
      xFromRight: isSet(object.xFromRight) ? Boolean(object.xFromRight) : undefined,
      yFromBottom: isSet(object.yFromBottom) ? Boolean(object.yFromBottom) : undefined,
      url: isSet(object.url) ? String(object.url) : "",
    };
  },

  toJSON(message: BrowserControlNewModal): unknown {
    const obj: any = {};
    message.width !== undefined && (obj.width = Math.round(message.width));
    message.height !== undefined && (obj.height = Math.round(message.height));
    message.x !== undefined && (obj.x = Math.round(message.x));
    message.y !== undefined && (obj.y = Math.round(message.y));
    message.useContentSize !== undefined && (obj.useContentSize = message.useContentSize);
    message.center !== undefined && (obj.center = message.center);
    message.minWidth !== undefined && (obj.minWidth = Math.round(message.minWidth));
    message.minHeight !== undefined && (obj.minHeight = Math.round(message.minHeight));
    message.maxWidth !== undefined && (obj.maxWidth = Math.round(message.maxWidth));
    message.maxHeight !== undefined && (obj.maxHeight = Math.round(message.maxHeight));
    message.alwaysOnTop !== undefined && (obj.alwaysOnTop = message.alwaysOnTop);
    message.show !== undefined && (obj.show = message.show);
    message.backgroundColor !== undefined && (obj.backgroundColor = message.backgroundColor);
    message.opacity !== undefined && (obj.opacity = Math.round(message.opacity));
    message.transparent !== undefined && (obj.transparent = message.transparent);
    message.modal !== undefined && (obj.modal = message.modal);
    message.hasShadow !== undefined && (obj.hasShadow = message.hasShadow);
    message.xFromRight !== undefined && (obj.xFromRight = message.xFromRight);
    message.yFromBottom !== undefined && (obj.yFromBottom = message.yFromBottom);
    message.url !== undefined && (obj.url = message.url);
    return obj;
  },

  create<I extends Exact<DeepPartial<BrowserControlNewModal>, I>>(base?: I): BrowserControlNewModal {
    return BrowserControlNewModal.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BrowserControlNewModal>, I>>(object: I): BrowserControlNewModal {
    const message = createBaseBrowserControlNewModal();
    message.width = object.width ?? undefined;
    message.height = object.height ?? undefined;
    message.x = object.x ?? undefined;
    message.y = object.y ?? undefined;
    message.useContentSize = object.useContentSize ?? undefined;
    message.center = object.center ?? undefined;
    message.minWidth = object.minWidth ?? undefined;
    message.minHeight = object.minHeight ?? undefined;
    message.maxWidth = object.maxWidth ?? undefined;
    message.maxHeight = object.maxHeight ?? undefined;
    message.alwaysOnTop = object.alwaysOnTop ?? undefined;
    message.show = object.show ?? undefined;
    message.backgroundColor = object.backgroundColor ?? undefined;
    message.opacity = object.opacity ?? undefined;
    message.transparent = object.transparent ?? undefined;
    message.modal = object.modal ?? undefined;
    message.hasShadow = object.hasShadow ?? undefined;
    message.xFromRight = object.xFromRight ?? undefined;
    message.yFromBottom = object.yFromBottom ?? undefined;
    message.url = object.url ?? "";
    return message;
  },
};

function createBaseBrowserControlTab(): BrowserControlTab {
  return { id: 0 };
}

export const BrowserControlTab = {
  encode(message: BrowserControlTab, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BrowserControlTab {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBrowserControlTab();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 8) {
            break;
          }

          message.id = reader.int32();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BrowserControlTab {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: BrowserControlTab): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  create<I extends Exact<DeepPartial<BrowserControlTab>, I>>(base?: I): BrowserControlTab {
    return BrowserControlTab.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BrowserControlTab>, I>>(object: I): BrowserControlTab {
    const message = createBaseBrowserControlTab();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseBrowserControlAudio(): BrowserControlAudio {
  return { muted: false };
}

export const BrowserControlAudio = {
  encode(message: BrowserControlAudio, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.muted === true) {
      writer.uint32(8).bool(message.muted);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BrowserControlAudio {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBrowserControlAudio();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 8) {
            break;
          }

          message.muted = reader.bool();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BrowserControlAudio {
    return { muted: isSet(object.muted) ? Boolean(object.muted) : false };
  },

  toJSON(message: BrowserControlAudio): unknown {
    const obj: any = {};
    message.muted !== undefined && (obj.muted = message.muted);
    return obj;
  },

  create<I extends Exact<DeepPartial<BrowserControlAudio>, I>>(base?: I): BrowserControlAudio {
    return BrowserControlAudio.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BrowserControlAudio>, I>>(object: I): BrowserControlAudio {
    const message = createBaseBrowserControlAudio();
    message.muted = object.muted ?? false;
    return message;
  },
};

function createBaseBrowserControlAction(): BrowserControlAction {
  return { action: BrowserControlAction_Action.UNDEFINED };
}

export const BrowserControlAction = {
  encode(message: BrowserControlAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.action !== BrowserControlAction_Action.UNDEFINED) {
      writer.uint32(8).int32(browserControlAction_ActionToNumber(message.action));
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BrowserControlAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBrowserControlAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 8) {
            break;
          }

          message.action = browserControlAction_ActionFromJSON(reader.int32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BrowserControlAction {
    return {
      action: isSet(object.action)
        ? browserControlAction_ActionFromJSON(object.action)
        : BrowserControlAction_Action.UNDEFINED,
    };
  },

  toJSON(message: BrowserControlAction): unknown {
    const obj: any = {};
    message.action !== undefined && (obj.action = browserControlAction_ActionToJSON(message.action));
    return obj;
  },

  create<I extends Exact<DeepPartial<BrowserControlAction>, I>>(base?: I): BrowserControlAction {
    return BrowserControlAction.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BrowserControlAction>, I>>(object: I): BrowserControlAction {
    const message = createBaseBrowserControlAction();
    message.action = object.action ?? BrowserControlAction_Action.UNDEFINED;
    return message;
  },
};

function createBaseBrowserPrintOption(): BrowserPrintOption {
  return {
    silent: undefined,
    printBackground: undefined,
    deviceName: undefined,
    color: undefined,
    landscape: undefined,
    scaleFactor: undefined,
    pagesPerSheet: undefined,
    collate: undefined,
    copies: undefined,
    fromPage: undefined,
    toPage: undefined,
    header: undefined,
    footer: undefined,
    pageSize: undefined,
  };
}

export const BrowserPrintOption = {
  encode(message: BrowserPrintOption, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.silent !== undefined) {
      writer.uint32(8).bool(message.silent);
    }
    if (message.printBackground !== undefined) {
      writer.uint32(16).bool(message.printBackground);
    }
    if (message.deviceName !== undefined) {
      writer.uint32(26).string(message.deviceName);
    }
    if (message.color !== undefined) {
      writer.uint32(32).bool(message.color);
    }
    if (message.landscape !== undefined) {
      writer.uint32(40).bool(message.landscape);
    }
    if (message.scaleFactor !== undefined) {
      writer.uint32(48).int32(message.scaleFactor);
    }
    if (message.pagesPerSheet !== undefined) {
      writer.uint32(56).int32(message.pagesPerSheet);
    }
    if (message.collate !== undefined) {
      writer.uint32(64).bool(message.collate);
    }
    if (message.copies !== undefined) {
      writer.uint32(72).int32(message.copies);
    }
    if (message.fromPage !== undefined) {
      writer.uint32(80).int32(message.fromPage);
    }
    if (message.toPage !== undefined) {
      writer.uint32(88).int32(message.toPage);
    }
    if (message.header !== undefined) {
      writer.uint32(98).string(message.header);
    }
    if (message.footer !== undefined) {
      writer.uint32(106).string(message.footer);
    }
    if (message.pageSize !== undefined) {
      writer.uint32(114).string(message.pageSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BrowserPrintOption {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBrowserPrintOption();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 8) {
            break;
          }

          message.silent = reader.bool();
          continue;
        case 2:
          if (tag != 16) {
            break;
          }

          message.printBackground = reader.bool();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.deviceName = reader.string();
          continue;
        case 4:
          if (tag != 32) {
            break;
          }

          message.color = reader.bool();
          continue;
        case 5:
          if (tag != 40) {
            break;
          }

          message.landscape = reader.bool();
          continue;
        case 6:
          if (tag != 48) {
            break;
          }

          message.scaleFactor = reader.int32();
          continue;
        case 7:
          if (tag != 56) {
            break;
          }

          message.pagesPerSheet = reader.int32();
          continue;
        case 8:
          if (tag != 64) {
            break;
          }

          message.collate = reader.bool();
          continue;
        case 9:
          if (tag != 72) {
            break;
          }

          message.copies = reader.int32();
          continue;
        case 10:
          if (tag != 80) {
            break;
          }

          message.fromPage = reader.int32();
          continue;
        case 11:
          if (tag != 88) {
            break;
          }

          message.toPage = reader.int32();
          continue;
        case 12:
          if (tag != 98) {
            break;
          }

          message.header = reader.string();
          continue;
        case 13:
          if (tag != 106) {
            break;
          }

          message.footer = reader.string();
          continue;
        case 14:
          if (tag != 114) {
            break;
          }

          message.pageSize = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BrowserPrintOption {
    return {
      silent: isSet(object.silent) ? Boolean(object.silent) : undefined,
      printBackground: isSet(object.printBackground) ? Boolean(object.printBackground) : undefined,
      deviceName: isSet(object.deviceName) ? String(object.deviceName) : undefined,
      color: isSet(object.color) ? Boolean(object.color) : undefined,
      landscape: isSet(object.landscape) ? Boolean(object.landscape) : undefined,
      scaleFactor: isSet(object.scaleFactor) ? Number(object.scaleFactor) : undefined,
      pagesPerSheet: isSet(object.pagesPerSheet) ? Number(object.pagesPerSheet) : undefined,
      collate: isSet(object.collate) ? Boolean(object.collate) : undefined,
      copies: isSet(object.copies) ? Number(object.copies) : undefined,
      fromPage: isSet(object.fromPage) ? Number(object.fromPage) : undefined,
      toPage: isSet(object.toPage) ? Number(object.toPage) : undefined,
      header: isSet(object.header) ? String(object.header) : undefined,
      footer: isSet(object.footer) ? String(object.footer) : undefined,
      pageSize: isSet(object.pageSize) ? String(object.pageSize) : undefined,
    };
  },

  toJSON(message: BrowserPrintOption): unknown {
    const obj: any = {};
    message.silent !== undefined && (obj.silent = message.silent);
    message.printBackground !== undefined && (obj.printBackground = message.printBackground);
    message.deviceName !== undefined && (obj.deviceName = message.deviceName);
    message.color !== undefined && (obj.color = message.color);
    message.landscape !== undefined && (obj.landscape = message.landscape);
    message.scaleFactor !== undefined && (obj.scaleFactor = Math.round(message.scaleFactor));
    message.pagesPerSheet !== undefined && (obj.pagesPerSheet = Math.round(message.pagesPerSheet));
    message.collate !== undefined && (obj.collate = message.collate);
    message.copies !== undefined && (obj.copies = Math.round(message.copies));
    message.fromPage !== undefined && (obj.fromPage = Math.round(message.fromPage));
    message.toPage !== undefined && (obj.toPage = Math.round(message.toPage));
    message.header !== undefined && (obj.header = message.header);
    message.footer !== undefined && (obj.footer = message.footer);
    message.pageSize !== undefined && (obj.pageSize = message.pageSize);
    return obj;
  },

  create<I extends Exact<DeepPartial<BrowserPrintOption>, I>>(base?: I): BrowserPrintOption {
    return BrowserPrintOption.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BrowserPrintOption>, I>>(object: I): BrowserPrintOption {
    const message = createBaseBrowserPrintOption();
    message.silent = object.silent ?? undefined;
    message.printBackground = object.printBackground ?? undefined;
    message.deviceName = object.deviceName ?? undefined;
    message.color = object.color ?? undefined;
    message.landscape = object.landscape ?? undefined;
    message.scaleFactor = object.scaleFactor ?? undefined;
    message.pagesPerSheet = object.pagesPerSheet ?? undefined;
    message.collate = object.collate ?? undefined;
    message.copies = object.copies ?? undefined;
    message.fromPage = object.fromPage ?? undefined;
    message.toPage = object.toPage ?? undefined;
    message.header = object.header ?? undefined;
    message.footer = object.footer ?? undefined;
    message.pageSize = object.pageSize ?? undefined;
    return message;
  },
};

function createBaseBrowserSavePageOption(): BrowserSavePageOption {
  return { fullPath: "", saveType: BrowserSavePageOption_SaveType.HTMLOnly };
}

export const BrowserSavePageOption = {
  encode(message: BrowserSavePageOption, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fullPath !== "") {
      writer.uint32(10).string(message.fullPath);
    }
    if (message.saveType !== BrowserSavePageOption_SaveType.HTMLOnly) {
      writer.uint32(16).int32(browserSavePageOption_SaveTypeToNumber(message.saveType));
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BrowserSavePageOption {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBrowserSavePageOption();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.fullPath = reader.string();
          continue;
        case 2:
          if (tag != 16) {
            break;
          }

          message.saveType = browserSavePageOption_SaveTypeFromJSON(reader.int32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BrowserSavePageOption {
    return {
      fullPath: isSet(object.fullPath) ? String(object.fullPath) : "",
      saveType: isSet(object.saveType)
        ? browserSavePageOption_SaveTypeFromJSON(object.saveType)
        : BrowserSavePageOption_SaveType.HTMLOnly,
    };
  },

  toJSON(message: BrowserSavePageOption): unknown {
    const obj: any = {};
    message.fullPath !== undefined && (obj.fullPath = message.fullPath);
    message.saveType !== undefined && (obj.saveType = browserSavePageOption_SaveTypeToJSON(message.saveType));
    return obj;
  },

  create<I extends Exact<DeepPartial<BrowserSavePageOption>, I>>(base?: I): BrowserSavePageOption {
    return BrowserSavePageOption.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BrowserSavePageOption>, I>>(object: I): BrowserSavePageOption {
    const message = createBaseBrowserSavePageOption();
    message.fullPath = object.fullPath ?? "";
    message.saveType = object.saveType ?? BrowserSavePageOption_SaveType.HTMLOnly;
    return message;
  },
};

function createBaseBrowserCaptureOption(): BrowserCaptureOption {
  return { path: undefined };
}

export const BrowserCaptureOption = {
  encode(message: BrowserCaptureOption, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.path !== undefined) {
      writer.uint32(10).string(message.path);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BrowserCaptureOption {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBrowserCaptureOption();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.path = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BrowserCaptureOption {
    return { path: isSet(object.path) ? String(object.path) : undefined };
  },

  toJSON(message: BrowserCaptureOption): unknown {
    const obj: any = {};
    message.path !== undefined && (obj.path = message.path);
    return obj;
  },

  create<I extends Exact<DeepPartial<BrowserCaptureOption>, I>>(base?: I): BrowserCaptureOption {
    return BrowserCaptureOption.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BrowserCaptureOption>, I>>(object: I): BrowserCaptureOption {
    const message = createBaseBrowserCaptureOption();
    message.path = object.path ?? undefined;
    return message;
  },
};

function createBaseBrowserFileFilter(): BrowserFileFilter {
  return { extensions: [], name: "" };
}

export const BrowserFileFilter = {
  encode(message: BrowserFileFilter, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.extensions) {
      writer.uint32(10).string(v!);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BrowserFileFilter {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBrowserFileFilter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.extensions.push(reader.string());
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BrowserFileFilter {
    return {
      extensions: Array.isArray(object?.extensions) ? object.extensions.map((e: any) => String(e)) : [],
      name: isSet(object.name) ? String(object.name) : "",
    };
  },

  toJSON(message: BrowserFileFilter): unknown {
    const obj: any = {};
    if (message.extensions) {
      obj.extensions = message.extensions.map((e) => e);
    } else {
      obj.extensions = [];
    }
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  create<I extends Exact<DeepPartial<BrowserFileFilter>, I>>(base?: I): BrowserFileFilter {
    return BrowserFileFilter.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BrowserFileFilter>, I>>(object: I): BrowserFileFilter {
    const message = createBaseBrowserFileFilter();
    message.extensions = object.extensions?.map((e) => e) || [];
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseBrowserSaveDialogOption(): BrowserSaveDialogOption {
  return {
    title: undefined,
    defaultPath: undefined,
    buttonLabel: undefined,
    filters: [],
    message: undefined,
    nameFieldLabel: undefined,
    showsTagField: undefined,
    properties: [],
    securityScopedBookmarks: undefined,
  };
}

export const BrowserSaveDialogOption = {
  encode(message: BrowserSaveDialogOption, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.title !== undefined) {
      writer.uint32(10).string(message.title);
    }
    if (message.defaultPath !== undefined) {
      writer.uint32(18).string(message.defaultPath);
    }
    if (message.buttonLabel !== undefined) {
      writer.uint32(26).string(message.buttonLabel);
    }
    for (const v of message.filters) {
      BrowserFileFilter.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.message !== undefined) {
      writer.uint32(42).string(message.message);
    }
    if (message.nameFieldLabel !== undefined) {
      writer.uint32(50).string(message.nameFieldLabel);
    }
    if (message.showsTagField !== undefined) {
      writer.uint32(56).bool(message.showsTagField);
    }
    writer.uint32(66).fork();
    for (const v of message.properties) {
      writer.int32(browserSaveDialogOption_SaveFileOptionToNumber(v));
    }
    writer.ldelim();
    if (message.securityScopedBookmarks !== undefined) {
      writer.uint32(72).bool(message.securityScopedBookmarks);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BrowserSaveDialogOption {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBrowserSaveDialogOption();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.title = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.defaultPath = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.buttonLabel = reader.string();
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.filters.push(BrowserFileFilter.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag != 42) {
            break;
          }

          message.message = reader.string();
          continue;
        case 6:
          if (tag != 50) {
            break;
          }

          message.nameFieldLabel = reader.string();
          continue;
        case 7:
          if (tag != 56) {
            break;
          }

          message.showsTagField = reader.bool();
          continue;
        case 8:
          if (tag == 64) {
            message.properties.push(browserSaveDialogOption_SaveFileOptionFromJSON(reader.int32()));
            continue;
          }

          if (tag == 66) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.properties.push(browserSaveDialogOption_SaveFileOptionFromJSON(reader.int32()));
            }

            continue;
          }

          break;
        case 9:
          if (tag != 72) {
            break;
          }

          message.securityScopedBookmarks = reader.bool();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BrowserSaveDialogOption {
    return {
      title: isSet(object.title) ? String(object.title) : undefined,
      defaultPath: isSet(object.defaultPath) ? String(object.defaultPath) : undefined,
      buttonLabel: isSet(object.buttonLabel) ? String(object.buttonLabel) : undefined,
      filters: Array.isArray(object?.filters) ? object.filters.map((e: any) => BrowserFileFilter.fromJSON(e)) : [],
      message: isSet(object.message) ? String(object.message) : undefined,
      nameFieldLabel: isSet(object.nameFieldLabel) ? String(object.nameFieldLabel) : undefined,
      showsTagField: isSet(object.showsTagField) ? Boolean(object.showsTagField) : undefined,
      properties: Array.isArray(object?.properties)
        ? object.properties.map((e: any) => browserSaveDialogOption_SaveFileOptionFromJSON(e))
        : [],
      securityScopedBookmarks: isSet(object.securityScopedBookmarks)
        ? Boolean(object.securityScopedBookmarks)
        : undefined,
    };
  },

  toJSON(message: BrowserSaveDialogOption): unknown {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.defaultPath !== undefined && (obj.defaultPath = message.defaultPath);
    message.buttonLabel !== undefined && (obj.buttonLabel = message.buttonLabel);
    if (message.filters) {
      obj.filters = message.filters.map((e) => e ? BrowserFileFilter.toJSON(e) : undefined);
    } else {
      obj.filters = [];
    }
    message.message !== undefined && (obj.message = message.message);
    message.nameFieldLabel !== undefined && (obj.nameFieldLabel = message.nameFieldLabel);
    message.showsTagField !== undefined && (obj.showsTagField = message.showsTagField);
    if (message.properties) {
      obj.properties = message.properties.map((e) => browserSaveDialogOption_SaveFileOptionToJSON(e));
    } else {
      obj.properties = [];
    }
    message.securityScopedBookmarks !== undefined && (obj.securityScopedBookmarks = message.securityScopedBookmarks);
    return obj;
  },

  create<I extends Exact<DeepPartial<BrowserSaveDialogOption>, I>>(base?: I): BrowserSaveDialogOption {
    return BrowserSaveDialogOption.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BrowserSaveDialogOption>, I>>(object: I): BrowserSaveDialogOption {
    const message = createBaseBrowserSaveDialogOption();
    message.title = object.title ?? undefined;
    message.defaultPath = object.defaultPath ?? undefined;
    message.buttonLabel = object.buttonLabel ?? undefined;
    message.filters = object.filters?.map((e) => BrowserFileFilter.fromPartial(e)) || [];
    message.message = object.message ?? undefined;
    message.nameFieldLabel = object.nameFieldLabel ?? undefined;
    message.showsTagField = object.showsTagField ?? undefined;
    message.properties = object.properties?.map((e) => e) || [];
    message.securityScopedBookmarks = object.securityScopedBookmarks ?? undefined;
    return message;
  },
};

function createBaseBrowserOpenDialogOptions(): BrowserOpenDialogOptions {
  return {
    title: undefined,
    defaultPath: undefined,
    buttonLabel: undefined,
    filters: [],
    properties: [],
    message: undefined,
    securityScopedBookmarks: undefined,
  };
}

export const BrowserOpenDialogOptions = {
  encode(message: BrowserOpenDialogOptions, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.title !== undefined) {
      writer.uint32(10).string(message.title);
    }
    if (message.defaultPath !== undefined) {
      writer.uint32(18).string(message.defaultPath);
    }
    if (message.buttonLabel !== undefined) {
      writer.uint32(26).string(message.buttonLabel);
    }
    for (const v of message.filters) {
      BrowserFileFilter.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    writer.uint32(42).fork();
    for (const v of message.properties) {
      writer.int32(browserOpenDialogOptions_OpenFileOptionToNumber(v));
    }
    writer.ldelim();
    if (message.message !== undefined) {
      writer.uint32(50).string(message.message);
    }
    if (message.securityScopedBookmarks !== undefined) {
      writer.uint32(56).bool(message.securityScopedBookmarks);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BrowserOpenDialogOptions {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBrowserOpenDialogOptions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.title = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.defaultPath = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.buttonLabel = reader.string();
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.filters.push(BrowserFileFilter.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag == 40) {
            message.properties.push(browserOpenDialogOptions_OpenFileOptionFromJSON(reader.int32()));
            continue;
          }

          if (tag == 42) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.properties.push(browserOpenDialogOptions_OpenFileOptionFromJSON(reader.int32()));
            }

            continue;
          }

          break;
        case 6:
          if (tag != 50) {
            break;
          }

          message.message = reader.string();
          continue;
        case 7:
          if (tag != 56) {
            break;
          }

          message.securityScopedBookmarks = reader.bool();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BrowserOpenDialogOptions {
    return {
      title: isSet(object.title) ? String(object.title) : undefined,
      defaultPath: isSet(object.defaultPath) ? String(object.defaultPath) : undefined,
      buttonLabel: isSet(object.buttonLabel) ? String(object.buttonLabel) : undefined,
      filters: Array.isArray(object?.filters) ? object.filters.map((e: any) => BrowserFileFilter.fromJSON(e)) : [],
      properties: Array.isArray(object?.properties)
        ? object.properties.map((e: any) => browserOpenDialogOptions_OpenFileOptionFromJSON(e))
        : [],
      message: isSet(object.message) ? String(object.message) : undefined,
      securityScopedBookmarks: isSet(object.securityScopedBookmarks)
        ? Boolean(object.securityScopedBookmarks)
        : undefined,
    };
  },

  toJSON(message: BrowserOpenDialogOptions): unknown {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.defaultPath !== undefined && (obj.defaultPath = message.defaultPath);
    message.buttonLabel !== undefined && (obj.buttonLabel = message.buttonLabel);
    if (message.filters) {
      obj.filters = message.filters.map((e) => e ? BrowserFileFilter.toJSON(e) : undefined);
    } else {
      obj.filters = [];
    }
    if (message.properties) {
      obj.properties = message.properties.map((e) => browserOpenDialogOptions_OpenFileOptionToJSON(e));
    } else {
      obj.properties = [];
    }
    message.message !== undefined && (obj.message = message.message);
    message.securityScopedBookmarks !== undefined && (obj.securityScopedBookmarks = message.securityScopedBookmarks);
    return obj;
  },

  create<I extends Exact<DeepPartial<BrowserOpenDialogOptions>, I>>(base?: I): BrowserOpenDialogOptions {
    return BrowserOpenDialogOptions.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BrowserOpenDialogOptions>, I>>(object: I): BrowserOpenDialogOptions {
    const message = createBaseBrowserOpenDialogOptions();
    message.title = object.title ?? undefined;
    message.defaultPath = object.defaultPath ?? undefined;
    message.buttonLabel = object.buttonLabel ?? undefined;
    message.filters = object.filters?.map((e) => BrowserFileFilter.fromPartial(e)) || [];
    message.properties = object.properties?.map((e) => e) || [];
    message.message = object.message ?? undefined;
    message.securityScopedBookmarks = object.securityScopedBookmarks ?? undefined;
    return message;
  },
};

function createBaseBrowserCertificateTrustDialogOptions(): BrowserCertificateTrustDialogOptions {
  return { certificate: undefined, message: undefined };
}

export const BrowserCertificateTrustDialogOptions = {
  encode(message: BrowserCertificateTrustDialogOptions, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.certificate !== undefined) {
      BrowserCertificate.encode(message.certificate, writer.uint32(10).fork()).ldelim();
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BrowserCertificateTrustDialogOptions {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBrowserCertificateTrustDialogOptions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.certificate = BrowserCertificate.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BrowserCertificateTrustDialogOptions {
    return {
      certificate: isSet(object.certificate) ? BrowserCertificate.fromJSON(object.certificate) : undefined,
      message: isSet(object.message) ? String(object.message) : undefined,
    };
  },

  toJSON(message: BrowserCertificateTrustDialogOptions): unknown {
    const obj: any = {};
    message.certificate !== undefined &&
      (obj.certificate = message.certificate ? BrowserCertificate.toJSON(message.certificate) : undefined);
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  create<I extends Exact<DeepPartial<BrowserCertificateTrustDialogOptions>, I>>(
    base?: I,
  ): BrowserCertificateTrustDialogOptions {
    return BrowserCertificateTrustDialogOptions.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BrowserCertificateTrustDialogOptions>, I>>(
    object: I,
  ): BrowserCertificateTrustDialogOptions {
    const message = createBaseBrowserCertificateTrustDialogOptions();
    message.certificate = (object.certificate !== undefined && object.certificate !== null)
      ? BrowserCertificate.fromPartial(object.certificate)
      : undefined;
    message.message = object.message ?? undefined;
    return message;
  },
};

function createBaseBrowserCertificate(): BrowserCertificate {
  return {
    data: undefined,
    fingerprint: undefined,
    issuer: undefined,
    issuerCert: undefined,
    issuerName: undefined,
    serialNumber: undefined,
    subject: undefined,
    subjectName: undefined,
    validExpiry: undefined,
    validStart: undefined,
  };
}

export const BrowserCertificate = {
  encode(message: BrowserCertificate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.data !== undefined) {
      writer.uint32(10).string(message.data);
    }
    if (message.fingerprint !== undefined) {
      writer.uint32(18).string(message.fingerprint);
    }
    if (message.issuer !== undefined) {
      BrowserCertificatePrincipal.encode(message.issuer, writer.uint32(26).fork()).ldelim();
    }
    if (message.issuerCert !== undefined) {
      BrowserCertificate.encode(message.issuerCert, writer.uint32(34).fork()).ldelim();
    }
    if (message.issuerName !== undefined) {
      writer.uint32(42).string(message.issuerName);
    }
    if (message.serialNumber !== undefined) {
      writer.uint32(50).string(message.serialNumber);
    }
    if (message.subject !== undefined) {
      BrowserCertificatePrincipal.encode(message.subject, writer.uint32(58).fork()).ldelim();
    }
    if (message.subjectName !== undefined) {
      writer.uint32(66).string(message.subjectName);
    }
    if (message.validExpiry !== undefined) {
      writer.uint32(72).int32(message.validExpiry);
    }
    if (message.validStart !== undefined) {
      writer.uint32(80).int32(message.validStart);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BrowserCertificate {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBrowserCertificate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.data = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.fingerprint = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.issuer = BrowserCertificatePrincipal.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.issuerCert = BrowserCertificate.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag != 42) {
            break;
          }

          message.issuerName = reader.string();
          continue;
        case 6:
          if (tag != 50) {
            break;
          }

          message.serialNumber = reader.string();
          continue;
        case 7:
          if (tag != 58) {
            break;
          }

          message.subject = BrowserCertificatePrincipal.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag != 66) {
            break;
          }

          message.subjectName = reader.string();
          continue;
        case 9:
          if (tag != 72) {
            break;
          }

          message.validExpiry = reader.int32();
          continue;
        case 10:
          if (tag != 80) {
            break;
          }

          message.validStart = reader.int32();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BrowserCertificate {
    return {
      data: isSet(object.data) ? String(object.data) : undefined,
      fingerprint: isSet(object.fingerprint) ? String(object.fingerprint) : undefined,
      issuer: isSet(object.issuer) ? BrowserCertificatePrincipal.fromJSON(object.issuer) : undefined,
      issuerCert: isSet(object.issuerCert) ? BrowserCertificate.fromJSON(object.issuerCert) : undefined,
      issuerName: isSet(object.issuerName) ? String(object.issuerName) : undefined,
      serialNumber: isSet(object.serialNumber) ? String(object.serialNumber) : undefined,
      subject: isSet(object.subject) ? BrowserCertificatePrincipal.fromJSON(object.subject) : undefined,
      subjectName: isSet(object.subjectName) ? String(object.subjectName) : undefined,
      validExpiry: isSet(object.validExpiry) ? Number(object.validExpiry) : undefined,
      validStart: isSet(object.validStart) ? Number(object.validStart) : undefined,
    };
  },

  toJSON(message: BrowserCertificate): unknown {
    const obj: any = {};
    message.data !== undefined && (obj.data = message.data);
    message.fingerprint !== undefined && (obj.fingerprint = message.fingerprint);
    message.issuer !== undefined &&
      (obj.issuer = message.issuer ? BrowserCertificatePrincipal.toJSON(message.issuer) : undefined);
    message.issuerCert !== undefined &&
      (obj.issuerCert = message.issuerCert ? BrowserCertificate.toJSON(message.issuerCert) : undefined);
    message.issuerName !== undefined && (obj.issuerName = message.issuerName);
    message.serialNumber !== undefined && (obj.serialNumber = message.serialNumber);
    message.subject !== undefined &&
      (obj.subject = message.subject ? BrowserCertificatePrincipal.toJSON(message.subject) : undefined);
    message.subjectName !== undefined && (obj.subjectName = message.subjectName);
    message.validExpiry !== undefined && (obj.validExpiry = Math.round(message.validExpiry));
    message.validStart !== undefined && (obj.validStart = Math.round(message.validStart));
    return obj;
  },

  create<I extends Exact<DeepPartial<BrowserCertificate>, I>>(base?: I): BrowserCertificate {
    return BrowserCertificate.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BrowserCertificate>, I>>(object: I): BrowserCertificate {
    const message = createBaseBrowserCertificate();
    message.data = object.data ?? undefined;
    message.fingerprint = object.fingerprint ?? undefined;
    message.issuer = (object.issuer !== undefined && object.issuer !== null)
      ? BrowserCertificatePrincipal.fromPartial(object.issuer)
      : undefined;
    message.issuerCert = (object.issuerCert !== undefined && object.issuerCert !== null)
      ? BrowserCertificate.fromPartial(object.issuerCert)
      : undefined;
    message.issuerName = object.issuerName ?? undefined;
    message.serialNumber = object.serialNumber ?? undefined;
    message.subject = (object.subject !== undefined && object.subject !== null)
      ? BrowserCertificatePrincipal.fromPartial(object.subject)
      : undefined;
    message.subjectName = object.subjectName ?? undefined;
    message.validExpiry = object.validExpiry ?? undefined;
    message.validStart = object.validStart ?? undefined;
    return message;
  },
};

function createBaseBrowserCertificatePrincipal(): BrowserCertificatePrincipal {
  return {
    commonName: undefined,
    country: undefined,
    locality: undefined,
    organizations: [],
    organizationUnits: [],
    state: undefined,
  };
}

export const BrowserCertificatePrincipal = {
  encode(message: BrowserCertificatePrincipal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.commonName !== undefined) {
      writer.uint32(10).string(message.commonName);
    }
    if (message.country !== undefined) {
      writer.uint32(18).string(message.country);
    }
    if (message.locality !== undefined) {
      writer.uint32(26).string(message.locality);
    }
    for (const v of message.organizations) {
      writer.uint32(34).string(v!);
    }
    for (const v of message.organizationUnits) {
      writer.uint32(42).string(v!);
    }
    if (message.state !== undefined) {
      writer.uint32(50).string(message.state);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BrowserCertificatePrincipal {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBrowserCertificatePrincipal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.commonName = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.country = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.locality = reader.string();
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.organizations.push(reader.string());
          continue;
        case 5:
          if (tag != 42) {
            break;
          }

          message.organizationUnits.push(reader.string());
          continue;
        case 6:
          if (tag != 50) {
            break;
          }

          message.state = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BrowserCertificatePrincipal {
    return {
      commonName: isSet(object.commonName) ? String(object.commonName) : undefined,
      country: isSet(object.country) ? String(object.country) : undefined,
      locality: isSet(object.locality) ? String(object.locality) : undefined,
      organizations: Array.isArray(object?.organizations) ? object.organizations.map((e: any) => String(e)) : [],
      organizationUnits: Array.isArray(object?.organizationUnits)
        ? object.organizationUnits.map((e: any) => String(e))
        : [],
      state: isSet(object.state) ? String(object.state) : undefined,
    };
  },

  toJSON(message: BrowserCertificatePrincipal): unknown {
    const obj: any = {};
    message.commonName !== undefined && (obj.commonName = message.commonName);
    message.country !== undefined && (obj.country = message.country);
    message.locality !== undefined && (obj.locality = message.locality);
    if (message.organizations) {
      obj.organizations = message.organizations.map((e) => e);
    } else {
      obj.organizations = [];
    }
    if (message.organizationUnits) {
      obj.organizationUnits = message.organizationUnits.map((e) => e);
    } else {
      obj.organizationUnits = [];
    }
    message.state !== undefined && (obj.state = message.state);
    return obj;
  },

  create<I extends Exact<DeepPartial<BrowserCertificatePrincipal>, I>>(base?: I): BrowserCertificatePrincipal {
    return BrowserCertificatePrincipal.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BrowserCertificatePrincipal>, I>>(object: I): BrowserCertificatePrincipal {
    const message = createBaseBrowserCertificatePrincipal();
    message.commonName = object.commonName ?? undefined;
    message.country = object.country ?? undefined;
    message.locality = object.locality ?? undefined;
    message.organizations = object.organizations?.map((e) => e) || [];
    message.organizationUnits = object.organizationUnits?.map((e) => e) || [];
    message.state = object.state ?? undefined;
    return message;
  },
};

function createBaseBrowserControlContent(): BrowserControlContent {
  return { relativeFile: undefined, absoluteFile: undefined, httpFile: undefined };
}

export const BrowserControlContent = {
  encode(message: BrowserControlContent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.relativeFile !== undefined) {
      writer.uint32(10).string(message.relativeFile);
    }
    if (message.absoluteFile !== undefined) {
      writer.uint32(18).string(message.absoluteFile);
    }
    if (message.httpFile !== undefined) {
      writer.uint32(26).string(message.httpFile);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BrowserControlContent {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBrowserControlContent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.relativeFile = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.absoluteFile = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.httpFile = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BrowserControlContent {
    return {
      relativeFile: isSet(object.relativeFile) ? String(object.relativeFile) : undefined,
      absoluteFile: isSet(object.absoluteFile) ? String(object.absoluteFile) : undefined,
      httpFile: isSet(object.httpFile) ? String(object.httpFile) : undefined,
    };
  },

  toJSON(message: BrowserControlContent): unknown {
    const obj: any = {};
    message.relativeFile !== undefined && (obj.relativeFile = message.relativeFile);
    message.absoluteFile !== undefined && (obj.absoluteFile = message.absoluteFile);
    message.httpFile !== undefined && (obj.httpFile = message.httpFile);
    return obj;
  },

  create<I extends Exact<DeepPartial<BrowserControlContent>, I>>(base?: I): BrowserControlContent {
    return BrowserControlContent.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BrowserControlContent>, I>>(object: I): BrowserControlContent {
    const message = createBaseBrowserControlContent();
    message.relativeFile = object.relativeFile ?? undefined;
    message.absoluteFile = object.absoluteFile ?? undefined;
    message.httpFile = object.httpFile ?? undefined;
    return message;
  },
};

function createBaseBrowserControlDownload(): BrowserControlDownload {
  return { id: "", action: BrowserControlDownload_Action.resume };
}

export const BrowserControlDownload = {
  encode(message: BrowserControlDownload, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.action !== BrowserControlDownload_Action.resume) {
      writer.uint32(16).int32(browserControlDownload_ActionToNumber(message.action));
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BrowserControlDownload {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBrowserControlDownload();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag != 16) {
            break;
          }

          message.action = browserControlDownload_ActionFromJSON(reader.int32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BrowserControlDownload {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      action: isSet(object.action)
        ? browserControlDownload_ActionFromJSON(object.action)
        : BrowserControlDownload_Action.resume,
    };
  },

  toJSON(message: BrowserControlDownload): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.action !== undefined && (obj.action = browserControlDownload_ActionToJSON(message.action));
    return obj;
  },

  create<I extends Exact<DeepPartial<BrowserControlDownload>, I>>(base?: I): BrowserControlDownload {
    return BrowserControlDownload.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BrowserControlDownload>, I>>(object: I): BrowserControlDownload {
    const message = createBaseBrowserControlDownload();
    message.id = object.id ?? "";
    message.action = object.action ?? BrowserControlDownload_Action.resume;
    return message;
  },
};

function createBaseBrowserControlFind(): BrowserControlFind {
  return { searchText: "", forward: undefined, findNext: undefined, matchCase: undefined };
}

export const BrowserControlFind = {
  encode(message: BrowserControlFind, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.searchText !== "") {
      writer.uint32(10).string(message.searchText);
    }
    if (message.forward !== undefined) {
      writer.uint32(16).bool(message.forward);
    }
    if (message.findNext !== undefined) {
      writer.uint32(24).bool(message.findNext);
    }
    if (message.matchCase !== undefined) {
      writer.uint32(32).bool(message.matchCase);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BrowserControlFind {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBrowserControlFind();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.searchText = reader.string();
          continue;
        case 2:
          if (tag != 16) {
            break;
          }

          message.forward = reader.bool();
          continue;
        case 3:
          if (tag != 24) {
            break;
          }

          message.findNext = reader.bool();
          continue;
        case 4:
          if (tag != 32) {
            break;
          }

          message.matchCase = reader.bool();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BrowserControlFind {
    return {
      searchText: isSet(object.searchText) ? String(object.searchText) : "",
      forward: isSet(object.forward) ? Boolean(object.forward) : undefined,
      findNext: isSet(object.findNext) ? Boolean(object.findNext) : undefined,
      matchCase: isSet(object.matchCase) ? Boolean(object.matchCase) : undefined,
    };
  },

  toJSON(message: BrowserControlFind): unknown {
    const obj: any = {};
    message.searchText !== undefined && (obj.searchText = message.searchText);
    message.forward !== undefined && (obj.forward = message.forward);
    message.findNext !== undefined && (obj.findNext = message.findNext);
    message.matchCase !== undefined && (obj.matchCase = message.matchCase);
    return obj;
  },

  create<I extends Exact<DeepPartial<BrowserControlFind>, I>>(base?: I): BrowserControlFind {
    return BrowserControlFind.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BrowserControlFind>, I>>(object: I): BrowserControlFind {
    const message = createBaseBrowserControlFind();
    message.searchText = object.searchText ?? "";
    message.forward = object.forward ?? undefined;
    message.findNext = object.findNext ?? undefined;
    message.matchCase = object.matchCase ?? undefined;
    return message;
  },
};

function createBaseBrowserControlStopFind(): BrowserControlStopFind {
  return { action: BrowserControlStopFind_Action.activateSelection };
}

export const BrowserControlStopFind = {
  encode(message: BrowserControlStopFind, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.action !== BrowserControlStopFind_Action.activateSelection) {
      writer.uint32(8).int32(browserControlStopFind_ActionToNumber(message.action));
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BrowserControlStopFind {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBrowserControlStopFind();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 8) {
            break;
          }

          message.action = browserControlStopFind_ActionFromJSON(reader.int32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BrowserControlStopFind {
    return {
      action: isSet(object.action)
        ? browserControlStopFind_ActionFromJSON(object.action)
        : BrowserControlStopFind_Action.activateSelection,
    };
  },

  toJSON(message: BrowserControlStopFind): unknown {
    const obj: any = {};
    message.action !== undefined && (obj.action = browserControlStopFind_ActionToJSON(message.action));
    return obj;
  },

  create<I extends Exact<DeepPartial<BrowserControlStopFind>, I>>(base?: I): BrowserControlStopFind {
    return BrowserControlStopFind.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BrowserControlStopFind>, I>>(object: I): BrowserControlStopFind {
    const message = createBaseBrowserControlStopFind();
    message.action = object.action ?? BrowserControlStopFind_Action.activateSelection;
    return message;
  },
};

function createBaseBrowserState(): BrowserState {
  return { views: [], currentViewId: undefined, downloads: [], foundResult: undefined, jsAttached: [], windows: [] };
}

export const BrowserState = {
  encode(message: BrowserState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.views) {
      BrowserStateView.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.currentViewId !== undefined) {
      writer.uint32(16).int32(message.currentViewId);
    }
    for (const v of message.downloads) {
      BrowserFile.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.foundResult !== undefined) {
      BrowserFoundResult.encode(message.foundResult, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.jsAttached) {
      writer.uint32(42).string(v!);
    }
    for (const v of message.windows) {
      BrowserWindowInfo.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BrowserState {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBrowserState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.views.push(BrowserStateView.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag != 16) {
            break;
          }

          message.currentViewId = reader.int32();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.downloads.push(BrowserFile.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.foundResult = BrowserFoundResult.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag != 42) {
            break;
          }

          message.jsAttached.push(reader.string());
          continue;
        case 6:
          if (tag != 50) {
            break;
          }

          message.windows.push(BrowserWindowInfo.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BrowserState {
    return {
      views: Array.isArray(object?.views) ? object.views.map((e: any) => BrowserStateView.fromJSON(e)) : [],
      currentViewId: isSet(object.currentViewId) ? Number(object.currentViewId) : undefined,
      downloads: Array.isArray(object?.downloads) ? object.downloads.map((e: any) => BrowserFile.fromJSON(e)) : [],
      foundResult: isSet(object.foundResult) ? BrowserFoundResult.fromJSON(object.foundResult) : undefined,
      jsAttached: Array.isArray(object?.jsAttached) ? object.jsAttached.map((e: any) => String(e)) : [],
      windows: Array.isArray(object?.windows) ? object.windows.map((e: any) => BrowserWindowInfo.fromJSON(e)) : [],
    };
  },

  toJSON(message: BrowserState): unknown {
    const obj: any = {};
    if (message.views) {
      obj.views = message.views.map((e) => e ? BrowserStateView.toJSON(e) : undefined);
    } else {
      obj.views = [];
    }
    message.currentViewId !== undefined && (obj.currentViewId = Math.round(message.currentViewId));
    if (message.downloads) {
      obj.downloads = message.downloads.map((e) => e ? BrowserFile.toJSON(e) : undefined);
    } else {
      obj.downloads = [];
    }
    message.foundResult !== undefined &&
      (obj.foundResult = message.foundResult ? BrowserFoundResult.toJSON(message.foundResult) : undefined);
    if (message.jsAttached) {
      obj.jsAttached = message.jsAttached.map((e) => e);
    } else {
      obj.jsAttached = [];
    }
    if (message.windows) {
      obj.windows = message.windows.map((e) => e ? BrowserWindowInfo.toJSON(e) : undefined);
    } else {
      obj.windows = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BrowserState>, I>>(base?: I): BrowserState {
    return BrowserState.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BrowserState>, I>>(object: I): BrowserState {
    const message = createBaseBrowserState();
    message.views = object.views?.map((e) => BrowserStateView.fromPartial(e)) || [];
    message.currentViewId = object.currentViewId ?? undefined;
    message.downloads = object.downloads?.map((e) => BrowserFile.fromPartial(e)) || [];
    message.foundResult = (object.foundResult !== undefined && object.foundResult !== null)
      ? BrowserFoundResult.fromPartial(object.foundResult)
      : undefined;
    message.jsAttached = object.jsAttached?.map((e) => e) || [];
    message.windows = object.windows?.map((e) => BrowserWindowInfo.fromPartial(e)) || [];
    return message;
  },
};

function createBaseBrowserWindowInfo(): BrowserWindowInfo {
  return { id: 0, url: "", isModal: false, isVisible: false, isFocused: false };
}

export const BrowserWindowInfo = {
  encode(message: BrowserWindowInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.url !== "") {
      writer.uint32(18).string(message.url);
    }
    if (message.isModal === true) {
      writer.uint32(24).bool(message.isModal);
    }
    if (message.isVisible === true) {
      writer.uint32(32).bool(message.isVisible);
    }
    if (message.isFocused === true) {
      writer.uint32(40).bool(message.isFocused);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BrowserWindowInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBrowserWindowInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 8) {
            break;
          }

          message.id = reader.int32();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.url = reader.string();
          continue;
        case 3:
          if (tag != 24) {
            break;
          }

          message.isModal = reader.bool();
          continue;
        case 4:
          if (tag != 32) {
            break;
          }

          message.isVisible = reader.bool();
          continue;
        case 5:
          if (tag != 40) {
            break;
          }

          message.isFocused = reader.bool();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BrowserWindowInfo {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      url: isSet(object.url) ? String(object.url) : "",
      isModal: isSet(object.isModal) ? Boolean(object.isModal) : false,
      isVisible: isSet(object.isVisible) ? Boolean(object.isVisible) : false,
      isFocused: isSet(object.isFocused) ? Boolean(object.isFocused) : false,
    };
  },

  toJSON(message: BrowserWindowInfo): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.url !== undefined && (obj.url = message.url);
    message.isModal !== undefined && (obj.isModal = message.isModal);
    message.isVisible !== undefined && (obj.isVisible = message.isVisible);
    message.isFocused !== undefined && (obj.isFocused = message.isFocused);
    return obj;
  },

  create<I extends Exact<DeepPartial<BrowserWindowInfo>, I>>(base?: I): BrowserWindowInfo {
    return BrowserWindowInfo.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BrowserWindowInfo>, I>>(object: I): BrowserWindowInfo {
    const message = createBaseBrowserWindowInfo();
    message.id = object.id ?? 0;
    message.url = object.url ?? "";
    message.isModal = object.isModal ?? false;
    message.isVisible = object.isVisible ?? false;
    message.isFocused = object.isFocused ?? false;
    return message;
  },
};

function createBaseBrowserFoundResult(): BrowserFoundResult {
  return { requestId: 0, activeMatchOrdinal: 0, matches: 0, selectionArea: undefined, finalUpdate: false };
}

export const BrowserFoundResult = {
  encode(message: BrowserFoundResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.requestId !== 0) {
      writer.uint32(8).int32(message.requestId);
    }
    if (message.activeMatchOrdinal !== 0) {
      writer.uint32(16).int32(message.activeMatchOrdinal);
    }
    if (message.matches !== 0) {
      writer.uint32(24).int32(message.matches);
    }
    if (message.selectionArea !== undefined) {
      BrowserFoundResult_Rectangle.encode(message.selectionArea, writer.uint32(34).fork()).ldelim();
    }
    if (message.finalUpdate === true) {
      writer.uint32(40).bool(message.finalUpdate);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BrowserFoundResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBrowserFoundResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 8) {
            break;
          }

          message.requestId = reader.int32();
          continue;
        case 2:
          if (tag != 16) {
            break;
          }

          message.activeMatchOrdinal = reader.int32();
          continue;
        case 3:
          if (tag != 24) {
            break;
          }

          message.matches = reader.int32();
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.selectionArea = BrowserFoundResult_Rectangle.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag != 40) {
            break;
          }

          message.finalUpdate = reader.bool();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BrowserFoundResult {
    return {
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
      activeMatchOrdinal: isSet(object.activeMatchOrdinal) ? Number(object.activeMatchOrdinal) : 0,
      matches: isSet(object.matches) ? Number(object.matches) : 0,
      selectionArea: isSet(object.selectionArea)
        ? BrowserFoundResult_Rectangle.fromJSON(object.selectionArea)
        : undefined,
      finalUpdate: isSet(object.finalUpdate) ? Boolean(object.finalUpdate) : false,
    };
  },

  toJSON(message: BrowserFoundResult): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = Math.round(message.requestId));
    message.activeMatchOrdinal !== undefined && (obj.activeMatchOrdinal = Math.round(message.activeMatchOrdinal));
    message.matches !== undefined && (obj.matches = Math.round(message.matches));
    message.selectionArea !== undefined && (obj.selectionArea = message.selectionArea
      ? BrowserFoundResult_Rectangle.toJSON(message.selectionArea)
      : undefined);
    message.finalUpdate !== undefined && (obj.finalUpdate = message.finalUpdate);
    return obj;
  },

  create<I extends Exact<DeepPartial<BrowserFoundResult>, I>>(base?: I): BrowserFoundResult {
    return BrowserFoundResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BrowserFoundResult>, I>>(object: I): BrowserFoundResult {
    const message = createBaseBrowserFoundResult();
    message.requestId = object.requestId ?? 0;
    message.activeMatchOrdinal = object.activeMatchOrdinal ?? 0;
    message.matches = object.matches ?? 0;
    message.selectionArea = (object.selectionArea !== undefined && object.selectionArea !== null)
      ? BrowserFoundResult_Rectangle.fromPartial(object.selectionArea)
      : undefined;
    message.finalUpdate = object.finalUpdate ?? false;
    return message;
  },
};

function createBaseBrowserFoundResult_Rectangle(): BrowserFoundResult_Rectangle {
  return { height: 0, width: 0, x: 0, y: 0 };
}

export const BrowserFoundResult_Rectangle = {
  encode(message: BrowserFoundResult_Rectangle, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.height !== 0) {
      writer.uint32(8).int32(message.height);
    }
    if (message.width !== 0) {
      writer.uint32(16).int32(message.width);
    }
    if (message.x !== 0) {
      writer.uint32(24).int32(message.x);
    }
    if (message.y !== 0) {
      writer.uint32(32).int32(message.y);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BrowserFoundResult_Rectangle {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBrowserFoundResult_Rectangle();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 8) {
            break;
          }

          message.height = reader.int32();
          continue;
        case 2:
          if (tag != 16) {
            break;
          }

          message.width = reader.int32();
          continue;
        case 3:
          if (tag != 24) {
            break;
          }

          message.x = reader.int32();
          continue;
        case 4:
          if (tag != 32) {
            break;
          }

          message.y = reader.int32();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BrowserFoundResult_Rectangle {
    return {
      height: isSet(object.height) ? Number(object.height) : 0,
      width: isSet(object.width) ? Number(object.width) : 0,
      x: isSet(object.x) ? Number(object.x) : 0,
      y: isSet(object.y) ? Number(object.y) : 0,
    };
  },

  toJSON(message: BrowserFoundResult_Rectangle): unknown {
    const obj: any = {};
    message.height !== undefined && (obj.height = Math.round(message.height));
    message.width !== undefined && (obj.width = Math.round(message.width));
    message.x !== undefined && (obj.x = Math.round(message.x));
    message.y !== undefined && (obj.y = Math.round(message.y));
    return obj;
  },

  create<I extends Exact<DeepPartial<BrowserFoundResult_Rectangle>, I>>(base?: I): BrowserFoundResult_Rectangle {
    return BrowserFoundResult_Rectangle.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BrowserFoundResult_Rectangle>, I>>(object: I): BrowserFoundResult_Rectangle {
    const message = createBaseBrowserFoundResult_Rectangle();
    message.height = object.height ?? 0;
    message.width = object.width ?? 0;
    message.x = object.x ?? 0;
    message.y = object.y ?? 0;
    return message;
  },
};

function createBaseBrowserFile(): BrowserFile {
  return {
    id: "",
    url: "",
    filePath: "",
    startTime: 0,
    lastUpdate: "",
    totalBytes: 0,
    receivedBytes: 0,
    mimeType: "",
    paused: false,
    state: BrowserFile_State.UNDEFINED,
    fileName: "",
  };
}

export const BrowserFile = {
  encode(message: BrowserFile, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.url !== "") {
      writer.uint32(18).string(message.url);
    }
    if (message.filePath !== "") {
      writer.uint32(26).string(message.filePath);
    }
    if (message.startTime !== 0) {
      writer.uint32(32).int32(message.startTime);
    }
    if (message.lastUpdate !== "") {
      writer.uint32(42).string(message.lastUpdate);
    }
    if (message.totalBytes !== 0) {
      writer.uint32(48).int32(message.totalBytes);
    }
    if (message.receivedBytes !== 0) {
      writer.uint32(56).int32(message.receivedBytes);
    }
    if (message.mimeType !== "") {
      writer.uint32(66).string(message.mimeType);
    }
    if (message.paused === true) {
      writer.uint32(72).bool(message.paused);
    }
    if (message.state !== BrowserFile_State.UNDEFINED) {
      writer.uint32(80).int32(browserFile_StateToNumber(message.state));
    }
    if (message.fileName !== "") {
      writer.uint32(90).string(message.fileName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BrowserFile {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBrowserFile();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.url = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.filePath = reader.string();
          continue;
        case 4:
          if (tag != 32) {
            break;
          }

          message.startTime = reader.int32();
          continue;
        case 5:
          if (tag != 42) {
            break;
          }

          message.lastUpdate = reader.string();
          continue;
        case 6:
          if (tag != 48) {
            break;
          }

          message.totalBytes = reader.int32();
          continue;
        case 7:
          if (tag != 56) {
            break;
          }

          message.receivedBytes = reader.int32();
          continue;
        case 8:
          if (tag != 66) {
            break;
          }

          message.mimeType = reader.string();
          continue;
        case 9:
          if (tag != 72) {
            break;
          }

          message.paused = reader.bool();
          continue;
        case 10:
          if (tag != 80) {
            break;
          }

          message.state = browserFile_StateFromJSON(reader.int32());
          continue;
        case 11:
          if (tag != 90) {
            break;
          }

          message.fileName = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BrowserFile {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      url: isSet(object.url) ? String(object.url) : "",
      filePath: isSet(object.filePath) ? String(object.filePath) : "",
      startTime: isSet(object.startTime) ? Number(object.startTime) : 0,
      lastUpdate: isSet(object.lastUpdate) ? String(object.lastUpdate) : "",
      totalBytes: isSet(object.totalBytes) ? Number(object.totalBytes) : 0,
      receivedBytes: isSet(object.receivedBytes) ? Number(object.receivedBytes) : 0,
      mimeType: isSet(object.mimeType) ? String(object.mimeType) : "",
      paused: isSet(object.paused) ? Boolean(object.paused) : false,
      state: isSet(object.state) ? browserFile_StateFromJSON(object.state) : BrowserFile_State.UNDEFINED,
      fileName: isSet(object.fileName) ? String(object.fileName) : "",
    };
  },

  toJSON(message: BrowserFile): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.url !== undefined && (obj.url = message.url);
    message.filePath !== undefined && (obj.filePath = message.filePath);
    message.startTime !== undefined && (obj.startTime = Math.round(message.startTime));
    message.lastUpdate !== undefined && (obj.lastUpdate = message.lastUpdate);
    message.totalBytes !== undefined && (obj.totalBytes = Math.round(message.totalBytes));
    message.receivedBytes !== undefined && (obj.receivedBytes = Math.round(message.receivedBytes));
    message.mimeType !== undefined && (obj.mimeType = message.mimeType);
    message.paused !== undefined && (obj.paused = message.paused);
    message.state !== undefined && (obj.state = browserFile_StateToJSON(message.state));
    message.fileName !== undefined && (obj.fileName = message.fileName);
    return obj;
  },

  create<I extends Exact<DeepPartial<BrowserFile>, I>>(base?: I): BrowserFile {
    return BrowserFile.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BrowserFile>, I>>(object: I): BrowserFile {
    const message = createBaseBrowserFile();
    message.id = object.id ?? "";
    message.url = object.url ?? "";
    message.filePath = object.filePath ?? "";
    message.startTime = object.startTime ?? 0;
    message.lastUpdate = object.lastUpdate ?? "";
    message.totalBytes = object.totalBytes ?? 0;
    message.receivedBytes = object.receivedBytes ?? 0;
    message.mimeType = object.mimeType ?? "";
    message.paused = object.paused ?? false;
    message.state = object.state ?? BrowserFile_State.UNDEFINED;
    message.fileName = object.fileName ?? "";
    return message;
  },
};

function createBaseBrowserStateView(): BrowserStateView {
  return {
    title: "",
    href: "",
    url: "",
    host: "",
    isLoading: false,
    favicon: "",
    viewId: 0,
    canGoBack: false,
    canGoForward: false,
    certError: undefined,
    certErrAt: undefined,
    cert: undefined,
    certDetails: undefined,
    certStatus: undefined,
    mediaState: undefined,
    isAudible: undefined,
    isMuted: undefined,
    errCode: undefined,
    errDesc: undefined,
    errAt: undefined,
    isCrashed: undefined,
    hideNavbar: undefined,
    urlBeforeResolve: undefined,
    urlAfterResolve: undefined,
  };
}

export const BrowserStateView = {
  encode(message: BrowserStateView, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.href !== "") {
      writer.uint32(18).string(message.href);
    }
    if (message.url !== "") {
      writer.uint32(26).string(message.url);
    }
    if (message.host !== "") {
      writer.uint32(34).string(message.host);
    }
    if (message.isLoading === true) {
      writer.uint32(40).bool(message.isLoading);
    }
    if (message.favicon !== "") {
      writer.uint32(50).string(message.favicon);
    }
    if (message.viewId !== 0) {
      writer.uint32(56).int32(message.viewId);
    }
    if (message.canGoBack === true) {
      writer.uint32(64).bool(message.canGoBack);
    }
    if (message.canGoForward === true) {
      writer.uint32(72).bool(message.canGoForward);
    }
    if (message.certError !== undefined) {
      writer.uint32(82).string(message.certError);
    }
    if (message.certErrAt !== undefined) {
      writer.uint32(88).int32(message.certErrAt);
    }
    if (message.cert !== undefined) {
      BrowserCertificate.encode(message.cert, writer.uint32(98).fork()).ldelim();
    }
    if (message.certDetails !== undefined) {
      BrowserCustomCert.encode(message.certDetails, writer.uint32(106).fork()).ldelim();
    }
    if (message.certStatus !== undefined) {
      writer.uint32(112).int32(browserStateView_CertStatusToNumber(message.certStatus));
    }
    if (message.mediaState !== undefined) {
      writer.uint32(120).int32(browserStateView_MediaStateToNumber(message.mediaState));
    }
    if (message.isAudible !== undefined) {
      writer.uint32(128).bool(message.isAudible);
    }
    if (message.isMuted !== undefined) {
      writer.uint32(136).bool(message.isMuted);
    }
    if (message.errCode !== undefined) {
      writer.uint32(144).int32(message.errCode);
    }
    if (message.errDesc !== undefined) {
      writer.uint32(154).string(message.errDesc);
    }
    if (message.errAt !== undefined) {
      writer.uint32(160).int32(message.errAt);
    }
    if (message.isCrashed !== undefined) {
      writer.uint32(168).bool(message.isCrashed);
    }
    if (message.hideNavbar !== undefined) {
      writer.uint32(176).bool(message.hideNavbar);
    }
    if (message.urlBeforeResolve !== undefined) {
      writer.uint32(186).string(message.urlBeforeResolve);
    }
    if (message.urlAfterResolve !== undefined) {
      writer.uint32(194).string(message.urlAfterResolve);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BrowserStateView {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBrowserStateView();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.title = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.href = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.url = reader.string();
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.host = reader.string();
          continue;
        case 5:
          if (tag != 40) {
            break;
          }

          message.isLoading = reader.bool();
          continue;
        case 6:
          if (tag != 50) {
            break;
          }

          message.favicon = reader.string();
          continue;
        case 7:
          if (tag != 56) {
            break;
          }

          message.viewId = reader.int32();
          continue;
        case 8:
          if (tag != 64) {
            break;
          }

          message.canGoBack = reader.bool();
          continue;
        case 9:
          if (tag != 72) {
            break;
          }

          message.canGoForward = reader.bool();
          continue;
        case 10:
          if (tag != 82) {
            break;
          }

          message.certError = reader.string();
          continue;
        case 11:
          if (tag != 88) {
            break;
          }

          message.certErrAt = reader.int32();
          continue;
        case 12:
          if (tag != 98) {
            break;
          }

          message.cert = BrowserCertificate.decode(reader, reader.uint32());
          continue;
        case 13:
          if (tag != 106) {
            break;
          }

          message.certDetails = BrowserCustomCert.decode(reader, reader.uint32());
          continue;
        case 14:
          if (tag != 112) {
            break;
          }

          message.certStatus = browserStateView_CertStatusFromJSON(reader.int32());
          continue;
        case 15:
          if (tag != 120) {
            break;
          }

          message.mediaState = browserStateView_MediaStateFromJSON(reader.int32());
          continue;
        case 16:
          if (tag != 128) {
            break;
          }

          message.isAudible = reader.bool();
          continue;
        case 17:
          if (tag != 136) {
            break;
          }

          message.isMuted = reader.bool();
          continue;
        case 18:
          if (tag != 144) {
            break;
          }

          message.errCode = reader.int32();
          continue;
        case 19:
          if (tag != 154) {
            break;
          }

          message.errDesc = reader.string();
          continue;
        case 20:
          if (tag != 160) {
            break;
          }

          message.errAt = reader.int32();
          continue;
        case 21:
          if (tag != 168) {
            break;
          }

          message.isCrashed = reader.bool();
          continue;
        case 22:
          if (tag != 176) {
            break;
          }

          message.hideNavbar = reader.bool();
          continue;
        case 23:
          if (tag != 186) {
            break;
          }

          message.urlBeforeResolve = reader.string();
          continue;
        case 24:
          if (tag != 194) {
            break;
          }

          message.urlAfterResolve = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BrowserStateView {
    return {
      title: isSet(object.title) ? String(object.title) : "",
      href: isSet(object.href) ? String(object.href) : "",
      url: isSet(object.url) ? String(object.url) : "",
      host: isSet(object.host) ? String(object.host) : "",
      isLoading: isSet(object.isLoading) ? Boolean(object.isLoading) : false,
      favicon: isSet(object.favicon) ? String(object.favicon) : "",
      viewId: isSet(object.viewId) ? Number(object.viewId) : 0,
      canGoBack: isSet(object.canGoBack) ? Boolean(object.canGoBack) : false,
      canGoForward: isSet(object.canGoForward) ? Boolean(object.canGoForward) : false,
      certError: isSet(object.certError) ? String(object.certError) : undefined,
      certErrAt: isSet(object.certErrAt) ? Number(object.certErrAt) : undefined,
      cert: isSet(object.cert) ? BrowserCertificate.fromJSON(object.cert) : undefined,
      certDetails: isSet(object.certDetails) ? BrowserCustomCert.fromJSON(object.certDetails) : undefined,
      certStatus: isSet(object.certStatus) ? browserStateView_CertStatusFromJSON(object.certStatus) : undefined,
      mediaState: isSet(object.mediaState) ? browserStateView_MediaStateFromJSON(object.mediaState) : undefined,
      isAudible: isSet(object.isAudible) ? Boolean(object.isAudible) : undefined,
      isMuted: isSet(object.isMuted) ? Boolean(object.isMuted) : undefined,
      errCode: isSet(object.errCode) ? Number(object.errCode) : undefined,
      errDesc: isSet(object.errDesc) ? String(object.errDesc) : undefined,
      errAt: isSet(object.errAt) ? Number(object.errAt) : undefined,
      isCrashed: isSet(object.isCrashed) ? Boolean(object.isCrashed) : undefined,
      hideNavbar: isSet(object.hideNavbar) ? Boolean(object.hideNavbar) : undefined,
      urlBeforeResolve: isSet(object.urlBeforeResolve) ? String(object.urlBeforeResolve) : undefined,
      urlAfterResolve: isSet(object.urlAfterResolve) ? String(object.urlAfterResolve) : undefined,
    };
  },

  toJSON(message: BrowserStateView): unknown {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.href !== undefined && (obj.href = message.href);
    message.url !== undefined && (obj.url = message.url);
    message.host !== undefined && (obj.host = message.host);
    message.isLoading !== undefined && (obj.isLoading = message.isLoading);
    message.favicon !== undefined && (obj.favicon = message.favicon);
    message.viewId !== undefined && (obj.viewId = Math.round(message.viewId));
    message.canGoBack !== undefined && (obj.canGoBack = message.canGoBack);
    message.canGoForward !== undefined && (obj.canGoForward = message.canGoForward);
    message.certError !== undefined && (obj.certError = message.certError);
    message.certErrAt !== undefined && (obj.certErrAt = Math.round(message.certErrAt));
    message.cert !== undefined && (obj.cert = message.cert ? BrowserCertificate.toJSON(message.cert) : undefined);
    message.certDetails !== undefined &&
      (obj.certDetails = message.certDetails ? BrowserCustomCert.toJSON(message.certDetails) : undefined);
    message.certStatus !== undefined && (obj.certStatus = message.certStatus !== undefined
      ? browserStateView_CertStatusToJSON(message.certStatus)
      : undefined);
    message.mediaState !== undefined && (obj.mediaState = message.mediaState !== undefined
      ? browserStateView_MediaStateToJSON(message.mediaState)
      : undefined);
    message.isAudible !== undefined && (obj.isAudible = message.isAudible);
    message.isMuted !== undefined && (obj.isMuted = message.isMuted);
    message.errCode !== undefined && (obj.errCode = Math.round(message.errCode));
    message.errDesc !== undefined && (obj.errDesc = message.errDesc);
    message.errAt !== undefined && (obj.errAt = Math.round(message.errAt));
    message.isCrashed !== undefined && (obj.isCrashed = message.isCrashed);
    message.hideNavbar !== undefined && (obj.hideNavbar = message.hideNavbar);
    message.urlBeforeResolve !== undefined && (obj.urlBeforeResolve = message.urlBeforeResolve);
    message.urlAfterResolve !== undefined && (obj.urlAfterResolve = message.urlAfterResolve);
    return obj;
  },

  create<I extends Exact<DeepPartial<BrowserStateView>, I>>(base?: I): BrowserStateView {
    return BrowserStateView.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BrowserStateView>, I>>(object: I): BrowserStateView {
    const message = createBaseBrowserStateView();
    message.title = object.title ?? "";
    message.href = object.href ?? "";
    message.url = object.url ?? "";
    message.host = object.host ?? "";
    message.isLoading = object.isLoading ?? false;
    message.favicon = object.favicon ?? "";
    message.viewId = object.viewId ?? 0;
    message.canGoBack = object.canGoBack ?? false;
    message.canGoForward = object.canGoForward ?? false;
    message.certError = object.certError ?? undefined;
    message.certErrAt = object.certErrAt ?? undefined;
    message.cert = (object.cert !== undefined && object.cert !== null)
      ? BrowserCertificate.fromPartial(object.cert)
      : undefined;
    message.certDetails = (object.certDetails !== undefined && object.certDetails !== null)
      ? BrowserCustomCert.fromPartial(object.certDetails)
      : undefined;
    message.certStatus = object.certStatus ?? undefined;
    message.mediaState = object.mediaState ?? undefined;
    message.isAudible = object.isAudible ?? undefined;
    message.isMuted = object.isMuted ?? undefined;
    message.errCode = object.errCode ?? undefined;
    message.errDesc = object.errDesc ?? undefined;
    message.errAt = object.errAt ?? undefined;
    message.isCrashed = object.isCrashed ?? undefined;
    message.hideNavbar = object.hideNavbar ?? undefined;
    message.urlBeforeResolve = object.urlBeforeResolve ?? undefined;
    message.urlAfterResolve = object.urlAfterResolve ?? undefined;
    return message;
  },
};

function createBaseBrowserCustomCert(): BrowserCustomCert {
  return {
    publicModulus: undefined,
    publicExponent: undefined,
    subject: undefined,
    issuer: undefined,
    serial: undefined,
    notBefore: undefined,
    notAfter: undefined,
    altNames: [],
    ocspList: [],
  };
}

export const BrowserCustomCert = {
  encode(message: BrowserCustomCert, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.publicModulus !== undefined) {
      writer.uint32(10).string(message.publicModulus);
    }
    if (message.publicExponent !== undefined) {
      writer.uint32(18).string(message.publicExponent);
    }
    if (message.subject !== undefined) {
      BrowserCustomCert_Subject.encode(message.subject, writer.uint32(26).fork()).ldelim();
    }
    if (message.issuer !== undefined) {
      BrowserCustomCert_Issuer.encode(message.issuer, writer.uint32(34).fork()).ldelim();
    }
    if (message.serial !== undefined) {
      writer.uint32(42).string(message.serial);
    }
    if (message.notBefore !== undefined) {
      writer.uint32(50).string(message.notBefore);
    }
    if (message.notAfter !== undefined) {
      writer.uint32(58).string(message.notAfter);
    }
    for (const v of message.altNames) {
      writer.uint32(66).string(v!);
    }
    for (const v of message.ocspList) {
      writer.uint32(74).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BrowserCustomCert {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBrowserCustomCert();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.publicModulus = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.publicExponent = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.subject = BrowserCustomCert_Subject.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.issuer = BrowserCustomCert_Issuer.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag != 42) {
            break;
          }

          message.serial = reader.string();
          continue;
        case 6:
          if (tag != 50) {
            break;
          }

          message.notBefore = reader.string();
          continue;
        case 7:
          if (tag != 58) {
            break;
          }

          message.notAfter = reader.string();
          continue;
        case 8:
          if (tag != 66) {
            break;
          }

          message.altNames.push(reader.string());
          continue;
        case 9:
          if (tag != 74) {
            break;
          }

          message.ocspList.push(reader.string());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BrowserCustomCert {
    return {
      publicModulus: isSet(object.publicModulus) ? String(object.publicModulus) : undefined,
      publicExponent: isSet(object.publicExponent) ? String(object.publicExponent) : undefined,
      subject: isSet(object.subject) ? BrowserCustomCert_Subject.fromJSON(object.subject) : undefined,
      issuer: isSet(object.issuer) ? BrowserCustomCert_Issuer.fromJSON(object.issuer) : undefined,
      serial: isSet(object.serial) ? String(object.serial) : undefined,
      notBefore: isSet(object.notBefore) ? String(object.notBefore) : undefined,
      notAfter: isSet(object.notAfter) ? String(object.notAfter) : undefined,
      altNames: Array.isArray(object?.altNames) ? object.altNames.map((e: any) => String(e)) : [],
      ocspList: Array.isArray(object?.ocspList) ? object.ocspList.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: BrowserCustomCert): unknown {
    const obj: any = {};
    message.publicModulus !== undefined && (obj.publicModulus = message.publicModulus);
    message.publicExponent !== undefined && (obj.publicExponent = message.publicExponent);
    message.subject !== undefined &&
      (obj.subject = message.subject ? BrowserCustomCert_Subject.toJSON(message.subject) : undefined);
    message.issuer !== undefined &&
      (obj.issuer = message.issuer ? BrowserCustomCert_Issuer.toJSON(message.issuer) : undefined);
    message.serial !== undefined && (obj.serial = message.serial);
    message.notBefore !== undefined && (obj.notBefore = message.notBefore);
    message.notAfter !== undefined && (obj.notAfter = message.notAfter);
    if (message.altNames) {
      obj.altNames = message.altNames.map((e) => e);
    } else {
      obj.altNames = [];
    }
    if (message.ocspList) {
      obj.ocspList = message.ocspList.map((e) => e);
    } else {
      obj.ocspList = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BrowserCustomCert>, I>>(base?: I): BrowserCustomCert {
    return BrowserCustomCert.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BrowserCustomCert>, I>>(object: I): BrowserCustomCert {
    const message = createBaseBrowserCustomCert();
    message.publicModulus = object.publicModulus ?? undefined;
    message.publicExponent = object.publicExponent ?? undefined;
    message.subject = (object.subject !== undefined && object.subject !== null)
      ? BrowserCustomCert_Subject.fromPartial(object.subject)
      : undefined;
    message.issuer = (object.issuer !== undefined && object.issuer !== null)
      ? BrowserCustomCert_Issuer.fromPartial(object.issuer)
      : undefined;
    message.serial = object.serial ?? undefined;
    message.notBefore = object.notBefore ?? undefined;
    message.notAfter = object.notAfter ?? undefined;
    message.altNames = object.altNames?.map((e) => e) || [];
    message.ocspList = object.ocspList?.map((e) => e) || [];
    return message;
  },
};

function createBaseBrowserCustomCert_Subject(): BrowserCustomCert_Subject {
  return {
    commonName: undefined,
    countryName: undefined,
    localityName: undefined,
    organizationName: undefined,
    stateOrProvinceName: undefined,
  };
}

export const BrowserCustomCert_Subject = {
  encode(message: BrowserCustomCert_Subject, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.commonName !== undefined) {
      writer.uint32(10).string(message.commonName);
    }
    if (message.countryName !== undefined) {
      writer.uint32(18).string(message.countryName);
    }
    if (message.localityName !== undefined) {
      writer.uint32(26).string(message.localityName);
    }
    if (message.organizationName !== undefined) {
      writer.uint32(34).string(message.organizationName);
    }
    if (message.stateOrProvinceName !== undefined) {
      writer.uint32(42).string(message.stateOrProvinceName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BrowserCustomCert_Subject {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBrowserCustomCert_Subject();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.commonName = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.countryName = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.localityName = reader.string();
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.organizationName = reader.string();
          continue;
        case 5:
          if (tag != 42) {
            break;
          }

          message.stateOrProvinceName = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BrowserCustomCert_Subject {
    return {
      commonName: isSet(object.commonName) ? String(object.commonName) : undefined,
      countryName: isSet(object.countryName) ? String(object.countryName) : undefined,
      localityName: isSet(object.localityName) ? String(object.localityName) : undefined,
      organizationName: isSet(object.organizationName) ? String(object.organizationName) : undefined,
      stateOrProvinceName: isSet(object.stateOrProvinceName) ? String(object.stateOrProvinceName) : undefined,
    };
  },

  toJSON(message: BrowserCustomCert_Subject): unknown {
    const obj: any = {};
    message.commonName !== undefined && (obj.commonName = message.commonName);
    message.countryName !== undefined && (obj.countryName = message.countryName);
    message.localityName !== undefined && (obj.localityName = message.localityName);
    message.organizationName !== undefined && (obj.organizationName = message.organizationName);
    message.stateOrProvinceName !== undefined && (obj.stateOrProvinceName = message.stateOrProvinceName);
    return obj;
  },

  create<I extends Exact<DeepPartial<BrowserCustomCert_Subject>, I>>(base?: I): BrowserCustomCert_Subject {
    return BrowserCustomCert_Subject.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BrowserCustomCert_Subject>, I>>(object: I): BrowserCustomCert_Subject {
    const message = createBaseBrowserCustomCert_Subject();
    message.commonName = object.commonName ?? undefined;
    message.countryName = object.countryName ?? undefined;
    message.localityName = object.localityName ?? undefined;
    message.organizationName = object.organizationName ?? undefined;
    message.stateOrProvinceName = object.stateOrProvinceName ?? undefined;
    return message;
  },
};

function createBaseBrowserCustomCert_Issuer(): BrowserCustomCert_Issuer {
  return { commonName: undefined, countryName: undefined, organizationName: undefined };
}

export const BrowserCustomCert_Issuer = {
  encode(message: BrowserCustomCert_Issuer, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.commonName !== undefined) {
      writer.uint32(10).string(message.commonName);
    }
    if (message.countryName !== undefined) {
      writer.uint32(18).string(message.countryName);
    }
    if (message.organizationName !== undefined) {
      writer.uint32(26).string(message.organizationName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BrowserCustomCert_Issuer {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBrowserCustomCert_Issuer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.commonName = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.countryName = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.organizationName = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BrowserCustomCert_Issuer {
    return {
      commonName: isSet(object.commonName) ? String(object.commonName) : undefined,
      countryName: isSet(object.countryName) ? String(object.countryName) : undefined,
      organizationName: isSet(object.organizationName) ? String(object.organizationName) : undefined,
    };
  },

  toJSON(message: BrowserCustomCert_Issuer): unknown {
    const obj: any = {};
    message.commonName !== undefined && (obj.commonName = message.commonName);
    message.countryName !== undefined && (obj.countryName = message.countryName);
    message.organizationName !== undefined && (obj.organizationName = message.organizationName);
    return obj;
  },

  create<I extends Exact<DeepPartial<BrowserCustomCert_Issuer>, I>>(base?: I): BrowserCustomCert_Issuer {
    return BrowserCustomCert_Issuer.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BrowserCustomCert_Issuer>, I>>(object: I): BrowserCustomCert_Issuer {
    const message = createBaseBrowserCustomCert_Issuer();
    message.commonName = object.commonName ?? undefined;
    message.countryName = object.countryName ?? undefined;
    message.organizationName = object.organizationName ?? undefined;
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Long ? string | number | Long : T extends Array<infer U> ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends { $case: string } ? { [K in keyof Omit<T, "$case">]?: DeepPartial<T[K]> } & { $case: T["$case"] }
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
