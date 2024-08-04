import { produce, type SetStoreFunction } from "solid-js/store";
import type { Action } from "./actions";
import type { GlobalState } from "./store";
import type { FileTreeNode } from "../types/rs/FileTreeNode";

class Reducer<Payload = undefined> {
  public constructor(
    private mutatingFn: (state: GlobalState, payload: Payload) => void,
  ) {}

  public call(payload: Payload, setState: SetStoreFunction<GlobalState>): void {
    setState(produce((state) => this.mutatingFn(state, payload)));
  }
}

// reducers

const openDirectoryButtonClicked = new Reducer((state) => {
  state.fileTree.status = `loading`;
});

const directoryLoaded = new Reducer<{ fileTree: FileTreeNode }>(
  (state, { fileTree }) => {
    state.fileTree = { status: `success`, data: fileTree };
  },
);

export default function reducer(
  action: Action,
  setState: SetStoreFunction<GlobalState>,
): void {
  switch (action.type) {
    case `openDirectoryButtonClicked`:
      openDirectoryButtonClicked.call(undefined, setState);
      break;
    case `directoryLoaded`:
      directoryLoaded.call(action, setState);
      break;
  }
}
