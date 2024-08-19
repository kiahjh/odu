import { invoke } from "@tauri-apps/api/core";
import type { Id } from "../../../types";
import {
  focusedPane,
  largestPaneId,
  newBuffer,
  updatePane,
} from "../../../utils";
import { openFiles } from "../../../utils/files";
import Reducer, { ReducerError } from "../Reducer";

export const fileInExplorerClicked = new Reducer<{
  filePath: string;
}>(async (state, { filePath }) => {
  const pane = focusedPane(state.rootPane);

  if (!pane) {
    throw new ReducerError(`No active pane found`);
  }

  state.mode = { type: `editor`, subMode: `normal` };

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
        buffers: [newBuffer(filePath, fileContents)],
        focused: true,
      });
      break;
    }
    case `editor`: {
      state.rootPane = updatePane(state.rootPane, pane.id, {
        ...pane,
        buffers: [
          ...pane.buffers.map((b) => ({ ...b, active: false })),
          newBuffer(filePath, fileContents),
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
            buffers: [newBuffer(filePath, fileContents)],
            focused: true,
          },
        ],
      });
    }
  }
});

export const bufferTabClicked = new Reducer<{ filePath: string; paneId: Id }>(
  (state, { filePath, paneId }) => {
    const file = openFiles(state.rootPane).find((f) => f.path === filePath);

    if (!file) {
      throw new ReducerError(
        `File ${filePath} not found in open files`,
        `Attempted to switch to a file, but that file isn't open.`,
      );
    }

    state.mode = { type: `editor`, subMode: `normal` };
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

export const bufferTabCloseClicked = new Reducer<{
  filePath: string;
  paneId: Id;
}>((state, { filePath, paneId }) => {
  const file = openFiles(state.rootPane).find((f) => f.path === filePath);

  if (!file) {
    throw new ReducerError(
      `File ${filePath} not found in open files`,
      `Attempted to close a file, but that file isn't open.`,
    );
  }

  state.mode = { type: `editor`, subMode: `normal` };
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
});
