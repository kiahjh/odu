import { createEffect } from "solid-js";
import type { Action } from "../state/actions";

export default function listenForKeystrokes(
  dispatch: (action: Action) => void,
) {
  const callback = (event: KeyboardEvent) => {
    if (event.type === `keypress`) {
      dispatch({
        key: event.key,
        ctrlKey: event.ctrlKey,
        shiftKey: event.shiftKey,
        altKey: event.altKey,
        metaKey: event.metaKey,
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
