import type { FileTreeNode } from "../types/rs/FileTreeNode";

export type Action =
  | { type: `openDirectoryButtonClicked` }
  | { type: `directoryLoaded`; fileTree: FileTreeNode };
