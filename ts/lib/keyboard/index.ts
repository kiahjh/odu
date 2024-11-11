import { createEffect } from "solid-js";
import type { Action } from "../state/actions";

export default function listenForKeystrokes(
  dispatch: (action: Action) => void,
) {
  const callback = (event: KeyboardEvent) => {
    if (event.type === `keypress`) {
      dispatch({
        event,
        type: `keyPressed`,
      });
    }
  };

  createEffect(
    () => {
      document.addEventListener(`keypress`, callback);
    },
    { onCleanup: () => document.removeEventListener(`keypress`, callback) },
  );
}
