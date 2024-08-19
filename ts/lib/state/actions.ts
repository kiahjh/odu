import type { Id } from "../types";

export type Action =
  | { type: `openDirectoryButtonClicked` }
  | { type: `directoryLoaded`; directoryPath: string }
  | { type: `fileInExplorerClicked`; filePath: string }
  | { type: `bufferTabClicked`; filePath: string; paneId: Id }
  | { type: `bufferTabCloseClicked`; filePath: string; paneId: Id }
  | {
      type: `keyPressed`;
      key: string;
      ctrlKey: boolean;
      shiftKey: boolean;
      altKey: boolean;
      metaKey: boolean;
    };
