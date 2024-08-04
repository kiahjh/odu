import cx from "classnames";
import type { Component } from "solid-js";

interface Props {
  className?: string;
}

const EditorPane: Component<Props> = ({ className }) => (
  <div class={cx(`text-white p-8`, className)}>EditorPane</div>
);

export default EditorPane;
