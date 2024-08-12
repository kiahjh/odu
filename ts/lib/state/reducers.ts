import { produce, type SetStoreFunction } from "solid-js/store";
import { invoke } from "@tauri-apps/api/core";
import type { Action } from "./actions";
import type { GlobalState } from "./store";
import type { FileTreeNode } from "../types/rs/FileTreeNode";
import type { Id } from "../types";
import { focusedPane, largestPaneId, updatePane } from "../utils";
import { openFiles } from "../utils/files";

class Reducer<Payload = undefined> {
  public constructor(
    private mutatingFn: (
      state: GlobalState,
      payload: Payload,
    ) => Promise<void> | void,
  ) {}

  public call(payload: Payload, setState: SetStoreFunction<GlobalState>): void {
    setState(produce(async (state) => await this.mutatingFn(state, payload)));
  }
}

class ReducerError {
  public constructor(
    public message: string,
    public detail?: string,
  ) {}
}

// reducers
// note: eventually these should probably be split up into multiple files for better organization; also all should be tested

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

export const fileInExplorerClicked = new Reducer<{
  filePath: string;
}>(async (state, { filePath }) => {
  const pane = focusedPane(state.rootPane);

  if (!pane) {
    throw new ReducerError(`No active pane found`);
  }

  const file = openFiles(state.rootPane).find((f) => f.path === filePath);

  if (file) {
    state.rootPane = updatePane(state.rootPane, file.pane.id, {
      ...file.pane,
      buffers: file.pane.buffers.map((b) => ({
        ...b,
        active: b.filePath === filePath,
      })),
    });
  }

  const fileContents = (await invoke(`load_file`, {
    path: filePath,
  })) as string;

  switch (pane.type) {
    case `new`: {
      state.rootPane = updatePane(state.rootPane, pane.id, {
        type: `editor`,
        id: pane.id,
        buffers: [
          {
            filePath,
            isDirty: false,
            content: fileContents,
            active: true,
          },
        ],
        focused: true,
      });
      break;
    }
    case `editor`: {
      state.rootPane = updatePane(state.rootPane, pane.id, {
        ...pane,
        buffers: [
          ...pane.buffers.map((b) => ({ ...b, active: false })),
          {
            filePath,
            isDirty: false,
            content: fileContents,
            active: true,
          },
        ],
      });
      break;
    }
    case `terminal`: {
      state.rootPane = updatePane(state.rootPane, pane.id, {
        type: `split`,
        direction: `horizontal`,
        id: largestPaneId(state.rootPane) + 1,
        panes: [
          {
            type: `terminal`,
            id: pane.id,
            focused: false,
          },
          {
            type: `editor`,
            id: largestPaneId(state.rootPane) + 2,
            buffers: [
              {
                filePath,
                isDirty: false,
                content: fileContents,
                active: true,
              },
            ],
            focused: true,
          },
        ],
      });
    }
  }
});

const bufferEdited = new Reducer<{ filePath: string; newContent: string }>(
  (state, { filePath, newContent }) => {
    const file = openFiles(state.rootPane).find((f) => f.path === filePath);

    if (!file) {
      throw new ReducerError(
        `File ${filePath} not found in open files`,
        `Attempted to edit a file, but that file isn't open.`,
      );
    }

    state.rootPane = updatePane(state.rootPane, file.pane.id, {
      ...file.pane,
      buffers: file.pane.buffers.map((b) =>
        b.filePath === filePath
          ? { ...b, content: newContent, isDirty: true }
          : b,
      ),
    });
  },
);

const bufferTabClicked = new Reducer<{ filePath: string; paneId: Id }>(
  (state, { filePath, paneId }) => {
    const file = openFiles(state.rootPane).find((f) => f.path === filePath);

    if (!file) {
      throw new ReducerError(
        `File ${filePath} not found in open files`,
        `Attempted to switch to a file, but that file isn't open.`,
      );
    }

    state.rootPane = updatePane(state.rootPane, paneId, {
      ...file.pane,
      buffers: file.pane.buffers.map((b) =>
        b.filePath === filePath
          ? { ...b, active: true }
          : { ...b, active: false },
      ),
    });
  },
);

const bufferTabCloseClicked = new Reducer<{ filePath: string; paneId: Id }>(
  (state, { filePath, paneId }) => {
    const file = openFiles(state.rootPane).find((f) => f.path === filePath);

    if (!file) {
      throw new ReducerError(
        `File ${filePath} not found in open files`,
        `Attempted to close a file, but that file isn't open.`,
      );
    }

    state.rootPane = updatePane(state.rootPane, paneId, {
      ...file.pane,
      buffers: file.pane.buffers
        .filter((b) => b.filePath !== filePath)
        .map((b, i) => {
          if (
            file.pane.buffers.find((b) => b.active && b.filePath !== filePath)
          ) {
            return b;
          } else if (i === file.pane.buffers.length - 2) {
            return { ...b, active: true };
          } else {
            return b;
          }
        }),
    });
  },
);

export default function reducer(
  action: Action,
  setState: SetStoreFunction<GlobalState>,
): void {
  try {
    switch (action.type) {
      case `openDirectoryButtonClicked`:
        openDirectoryButtonClicked.call(undefined, setState);
        break;
      case `directoryLoaded`:
        directoryLoaded.call(action, setState);
        break;
      case `fileInExplorerClicked`:
        fileInExplorerClicked.call(action, setState);
        break;
      case `bufferEdited`:
        bufferEdited.call(action, setState);
        break;
      case `bufferTabClicked`:
        bufferTabClicked.call(action, setState);
        break;
      case `bufferTabCloseClicked`:
        bufferTabCloseClicked.call(action, setState);
        break;
      default:
        // @ts-expect-error
        action.type;
    }
  } catch (e) {
    // TODO: make error handling more user-friendly
    const error: ReducerError = e as any;
    console.error(`Reducer error: ${error.message}`);
    console.error(`Details: ${error.detail ?? `none`}`);
  }
}
