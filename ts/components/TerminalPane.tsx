import cx from "classnames";
import type { Component } from "solid-js";

interface Props {
  className?: string;
}

const TerminalPane: Component<Props> = ({ className }) => (
  <div class={cx(`text-white p-8`, className)}>TerminalPane</div>
);

export default TerminalPane;
