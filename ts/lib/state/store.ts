import { createStore } from "solid-js/store";
import { createContext, useContext } from "solid-js";
import type { FileTreeNode } from "../types/rs/FileTreeNode";
import type { Entity } from "../types";
import type { Action } from "./actions";
import { idleEntity } from "../utils";

export type GlobalState = {
  fileTree: Entity<FileTreeNode>;
};

export const [state, setState] = createStore<GlobalState>({
  fileTree: idleEntity(),
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
