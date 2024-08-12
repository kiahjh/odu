import type { Id } from "../types";

export type Action =
  | { type: `openDirectoryButtonClicked` }
  | { type: `directoryLoaded`; directoryPath: string }
  | { type: `fileInExplorerClicked`; filePath: string }
  | { type: `bufferEdited`; filePath: string; newContent: string }
  | { type: `bufferTabClicked`; filePath: string; paneId: Id }
  | { type: `bufferTabCloseClicked`; filePath: string; paneId: Id };
