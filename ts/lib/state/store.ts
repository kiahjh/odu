import { createStore } from "solid-js/store";
import { createContext, useContext } from "solid-js";
import type { FileTreeNode } from "../types/rs/FileTreeNode";
import type { Entity, Mode, PaneType } from "../types";
import type { Action } from "./actions";
import { idleEntity } from "../utils";

export type GlobalState = {
  fileTree: Entity<FileTreeNode>;
  rootPane: PaneType;
  mode: Mode;
  fileExplorerOpen: boolean;
};

export const INITIAL_STATE: GlobalState = {
  fileTree: idleEntity(),
  rootPane: {
    type: `new`,
    focused: true,
    id: 0,
  },
  mode: { type: `new` },
  fileExplorerOpen: true,
};

export const [state, setState] = createStore<GlobalState>(INITIAL_STATE);

export const GlobalStateContext = createContext<{
  state: GlobalState;
  dispatch: (action: Action) => void;
}>();

export function globalState(): {
  state: GlobalState;
  dispatch: (action: Action) => void;
} {
  const res = useContext(GlobalStateContext);
  if (!res) {
    throw new Error(`No context found`);
  }
  return res;
}
