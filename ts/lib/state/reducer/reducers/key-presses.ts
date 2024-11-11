import type { GlobalState } from "../../store";
import { focusedPane } from "../../../utils";
import Reducer, { ReducerError } from "../Reducer";

export const keyPressed = new Reducer<{
  event: KeyboardEvent;
}>((state, { event }) => {
  const activePane = focusedPane(state.rootPane);
  if (!activePane) return;

  const kda = createKeyboardDrivenActionMaker(state, event);

  // global commands:

  if (event.key === `s` && event.metaKey) {
    // toggleSidebar
    state.fileExplorerOpen = !state.fileExplorerOpen;
    return;
  }

  // mode-specific commands:

  if (state.mode.type === `new`) {
    return;
  }

  if (state.mode.type === `editor`) {
    if (activePane.type !== `editor`)
      throw new ReducerError(
        `In editor mode, but active pane is not an editor pane.`,
      );

    switch (state.mode.subMode) {
      case `normal`: {
        kda(switchToInsertMode, `i`, false, false, false, false);
        kda(switchToVisualMode, `v`, false, false, false, false);
        kda(switchToSearchMode, `/`, false, false, false, false);
        return;
      }
      case `insert`:
        kda(switchToNormalMode, `Escape`, false, false, false, false);
        return;
      case `visual`:
        kda(switchToNormalMode, `Escape`, false, false, false, false);
        kda(switchToVisualLineMode, `l`, false, false, false, false);
        kda(switchToVisualBlockMode, `b`, false, false, false, false);
        return;
      case `visual-line`:
        kda(switchToNormalMode, `Escape`, false, false, false, false);
        kda(switchToVisualMode, `l`, false, false, false, false);
        kda(switchToVisualMode, `v`, false, false, false, false);
        kda(switchToVisualBlockMode, `b`, false, false, false, false);
        return;
      case `visual-block`:
        kda(switchToNormalMode, `Escape`, false, false, false, false);
        kda(switchToVisualMode, `b`, false, false, false, false);
        kda(switchToVisualMode, `v`, false, false, false, false);
        kda(switchToVisualLineMode, `l`, false, false, false, false);
        return;
      case `search`:
        kda(switchToNormalMode, `Escape`, false, false, false, false);
        return;
    }
  }

  if (state.mode.type === `file-explorer`) {
    return;
  }
});

// actions

const switchToInsertMode: StateManipulator = (state) => {
  if (state.mode.type === `editor`) {
    state.mode.subMode = `insert`;
  }
};

const switchToNormalMode: StateManipulator = (state) => {
  if (state.mode.type === `editor`) {
    state.mode.subMode = `normal`;
  }
};

const switchToVisualMode: StateManipulator = (state) => {
  if (state.mode.type === `editor`) {
    state.mode.subMode = `visual`;
  }
};

const switchToVisualLineMode: StateManipulator = (state) => {
  if (state.mode.type === `editor`) {
    state.mode.subMode = `visual-line`;
  }
};

const switchToVisualBlockMode: StateManipulator = (state) => {
  if (state.mode.type === `editor`) {
    state.mode.subMode = `visual-block`;
  }
};

const switchToSearchMode: StateManipulator = (state) => {
  if (state.mode.type === `editor`) {
    state.mode.subMode = `search`;
  }
};

// helpers

type StateManipulator = (state: GlobalState) => void;

function createKeyboardDrivenActionMaker(
  state: GlobalState,
  event: KeyboardEvent,
): (
  fn: StateManipulator,
  key: string,
  shift: boolean,
  ctrl: boolean,
  meta: boolean,
  alt: boolean,
) => void {
  return (
    fn: StateManipulator,
    key: string,
    shift: boolean,
    ctrl: boolean,
    meta: boolean,
    alt: boolean,
  ) => {
    if (
      event.key === key &&
      event.shiftKey === shift &&
      event.ctrlKey === ctrl &&
      event.metaKey === meta &&
      event.altKey === alt
    ) {
      fn(state);
    }
  };
}
