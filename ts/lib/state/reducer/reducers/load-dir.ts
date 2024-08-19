import { invoke } from "@tauri-apps/api/core";
import type { FileTreeNode } from "../../../types/rs/FileTreeNode";
import Reducer from "../Reducer";

export const openDirectoryButtonClicked = new Reducer((state) => {
  state.fileTree.status = `loading`;
});

export const directoryLoaded = new Reducer<{ directoryPath: string }>(
  async (state, { directoryPath }) => {
    const fileTree = (await invoke(`crawl_dir`, {
      path: directoryPath,
    })) as FileTreeNode;
    state.fileTree = { status: `success`, data: fileTree };
  },
);
