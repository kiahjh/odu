import { produce, type SetStoreFunction } from "solid-js/store";
import type { GlobalState } from "../store";

export default class Reducer<Payload = undefined> {
  public constructor(
    private mutatingFn: (
      state: GlobalState,
      payload: Payload,
    ) => Promise<void> | void,
  ) {}

  public call(payload: Payload, setState: SetStoreFunction<GlobalState>): void {
    setState(produce(async (state) => await this.mutatingFn(state, payload)));
  }

  public mutate(globalState: GlobalState, payload: Payload) {
    produce<GlobalState>(
      async (state) => await this.mutatingFn(state, payload),
    )(globalState);
  }
}

export class ReducerError {
  public constructor(
    public message: string,
    public detail?: string,
  ) {}
}
