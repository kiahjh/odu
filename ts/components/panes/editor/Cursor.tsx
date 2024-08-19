import type { Component } from "solid-js";
import type { CharacterPosition } from "../../../lib/types";
import { globalState } from "../../../lib/state/store";

interface Props {
  position: CharacterPosition;
}

const CHAR_WIDTH = 9.0312;

const Cursor: Component<Props> = (props) => {
  const { state } = globalState();

  return (
    <div
      class="absolute bg-green-500 h-[22px]"
      style={{
        top: `${props.position.row * 24 + 16}px`,
        left: `${props.position.column * 10 + 56}px`,
        width: `${state.mode.type === `editor` && state.mode.subMode === `insert` ? 3 : CHAR_WIDTH}px`,
        "margin-left": `${state.mode.type === `editor` && state.mode.subMode === `insert` ? -1.5 : 0}px`,
      }}
    />
  );
};

export default Cursor;
