import cx from "classnames";
import type { Component } from "solid-js";
import type { Mode } from "../lib/types";
import { globalState } from "../lib/state/store";
import KeyboardShortcut from "./KeyboardShortcut";

const BottomBar: Component = () => {
  const { state } = globalState();

  return (
    <div class="h-8 bg-black border-gray-800 border-b border-x rounded-b-lg flex justify-between items-center overflow-hidden">
      <HelpMessage mode={state.mode} />
    </div>
  );
};

export default BottomBar;

const HelpMessage: Component<{ mode: Mode }> = (props) => (
  <div class="h-full">
    {props.mode.type === `new` && <div></div>}
    {props.mode.type === `file-explorer` && <div></div>}
    {props.mode.type === `editor` && (
      <div class={cx(`flex h-full items-center pl-1.5 relative`)}>
        <div
          class={cx(`absolute h-full w-[400px] left-0 top-0 bg-gradient-to-r`, {
            hidden: props.mode.subMode === `normal`,
            "from-blue-500/40 to-transparent": props.mode.subMode === `insert`,
            "from-pink-500/30 to-transparent": props.mode.subMode === `visual`,
            "from-purple-500/40 to-transparent":
              props.mode.subMode === `visual-line`,
            "from-orange-400/30 to-transparent":
              props.mode.subMode === `visual-block`,
            "from-green-400/30 to-transparent": props.mode.subMode === `search`,
          })}
        />
        <span
          class={cx(
            `text-black font-mono font-semibold text-sm rounded px-4 flex items-center relative`,
            {
              "bg-gray-800/70 !text-gray-400": props.mode.subMode === `normal`,
              "bg-blue-400": props.mode.subMode === `insert`,
              "bg-pink-400": props.mode.subMode === `visual`,
              "bg-purple-400": props.mode.subMode === `visual-line`,
              "bg-orange-400": props.mode.subMode === `visual-block`,
              "bg-green-400": props.mode.subMode === `search`,
            },
          )}
        >
          {props.mode.subMode}
        </span>
        <div class="flex items-center ml-4 gap-3 relative">
          {Object.entries(helpMessages[props.mode.subMode]).map(
            ([key, description]) => (
              <KeyboardShortcut key={key} description={description} bottomBar />
            ),
          )}
        </div>
      </div>
    )}
  </div>
);

const helpMessages = {
  normal: {
    i: `insert mode`,
    v: `visual mode`,
    "/": `search`,
  },
  insert: {
    esc: `normal mode`,
  },
  visual: {
    esc: `normal mode`,
    l: `line`,
    b: `block`,
  },
  "visual-line": {
    esc: `normal mode`,
    l: `visual mode`,
    b: `block`,
  },
  "visual-block": {
    esc: `normal mode`,
    b: `visual mode`,
    l: `line`,
  },
  search: {
    esc: `normal mode`,
    "ctrl-g": `global search`,
  },
};
