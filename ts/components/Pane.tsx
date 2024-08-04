import cx from "classnames";
import type { Component } from "solid-js";
import NewPane from "./NewPane";
import EditorPane from "./EditorPane";
import TerminalPane from "./TerminalPane";

interface Props {
  type: "editor" | "terminal" | "new";
  className?: string;
}

const Pane: Component<Props> = ({ type, className }) => {
  let element = <div></div>;
  switch (type) {
    case `new`:
      element = <NewPane />;
      break;
    case `editor`:
      element = <EditorPane />;
      break;
    case `terminal`:
      element = <TerminalPane />;
      break;
  }
  return <div class={cx(`flex`, className)}>{element}</div>;
};

export default Pane;
