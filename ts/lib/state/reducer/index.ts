import { type SetStoreFunction } from "solid-js/store";
import type { Action } from "../actions";
import type { GlobalState } from "../store";
import type { ReducerError } from "./Reducer";
import {
  directoryLoaded,
  openDirectoryButtonClicked,
} from "./reducers/load-dir";
import {
  bufferTabClicked,
  bufferTabCloseClicked,
  fileInExplorerClicked,
} from "./reducers/buffers";
import { keyPressed } from "./reducers/key-presses";

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
      case `bufferTabClicked`:
        bufferTabClicked.call(action, setState);
        break;
      case `bufferTabCloseClicked`:
        bufferTabCloseClicked.call(action, setState);
        break;
      case `keyPressed`:
        keyPressed.call(action, setState);
        break;
      default:
        // @ts-expect-error
        action.type;
    }
  } catch (e) {
    // TODO: make error handling more user-friendly
    const error: ReducerError = e as any;
    alert(`Reducer error: ${error.message}`);
    console.error(`Reducer error: ${error.message}`);
    console.error(`Details: ${error.detail ?? `none`}`);
  }
}
