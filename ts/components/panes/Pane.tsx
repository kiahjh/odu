import cx from "classnames";
import type { Component } from "solid-js";
import type { PaneType } from "../../lib/types";
import NewPane from "./NewPane";
import EditorPane from "./editor/EditorPane";
import TerminalPane from "./terminal/TerminalPane";

interface Props {
  pane: PaneType;
  className?: string;
}

const Pane: Component<Props> = (props) => (
  <div class={cx(props.className, `flex`)}>
    {(() => {
      switch (props.pane.type) {
        case `new`:
          return <NewPane />;
        case `editor`:
          return <EditorPane pane={props.pane} />;
        case `terminal`:
          return <TerminalPane />;
      }
    })()}
  </div>
);

export default Pane;
