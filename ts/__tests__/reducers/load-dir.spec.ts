// NOTE: I left off in the middle of making a mockable invoke. see lib/rust

import { expect, it, describe, beforeEach } from "bun:test";
import type { GlobalState } from "../../lib/state/store";
import { openDirectoryButtonClicked } from "../../lib/state/reducer/reducers/load-dir";
import { INITIAL_STATE } from "../../lib/state/store";

let initialState: GlobalState;
beforeEach(() => {
  initialState = { ...INITIAL_STATE };
});

describe(`openDirectoryButtonClicked`, () => {
  it(`should set the fileTree status to loading`, () => {
    expect(initialState.fileTree.status).toBe(`idle`);
    openDirectoryButtonClicked.mutate(initialState, undefined);
    expect(initialState.fileTree.status).toBe(`loading`);
  });
});

describe(`directoryLoaded`, () => {
  // TODO: need to mock invoke... hmm...
});
