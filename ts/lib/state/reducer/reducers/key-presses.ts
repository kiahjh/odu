import Reducer from "../Reducer";

export const keyPressed = new Reducer<{
  key: string;
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
  metaKey: boolean;
}>((state, { key, ctrlKey, shiftKey, altKey, metaKey }) => {
  // global commands:

  if (key === `s` && metaKey) {
    // toggleSidebar
    state.fileExplorerOpen = !state.fileExplorerOpen;
    return;
  }

  // mode-specific commands:

  if (state.mode.type === `new`) {
    return;
  }

  if (state.mode.type === `editor`) {
    switch (state.mode.subMode) {
      case `normal`: {
        if (key === `i`) {
          state.mode.subMode = `insert`;
        } else if (key === `v`) {
          state.mode.subMode = `visual`;
        } else if (key === `/`) {
          state.mode.subMode = `search`;
        }
        return;
      }
      case `insert`:
        if (key === `Escape`) {
          state.mode.subMode = `normal`;
        }
        return;
      case `visual`:
        if (key === `Escape`) {
          state.mode.subMode = `normal`;
        }
        return;
      case `search`:
        if (key === `Escape`) {
          state.mode.subMode = `normal`;
        }
        return;
    }
  }

  if (state.mode.type === `file-explorer`) {
    return;
  }
});
