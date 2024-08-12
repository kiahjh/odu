import { createStore } from "solid-js/store";
import { createContext, useContext } from "solid-js";
import type { FileTreeNode } from "../types/rs/FileTreeNode";
import type { Entity, PaneType } from "../types";
import type { Action } from "./actions";
import { idleEntity } from "../utils";

export type GlobalState = {
  fileTree: Entity<FileTreeNode>;
  rootPane: PaneType;
};

export const [state, setState] = createStore<GlobalState>({
  fileTree: idleEntity(),
  rootPane: {
    type: `new`,
    focused: true,
    id: 0,
  },
});

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
