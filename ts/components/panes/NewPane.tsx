import cx from "classnames";
import type { Component } from "solid-js";
import Logo from "/logo.svg";
import KeyboardShortcut from "../KeyboardShortcut";

interface Props {
  className?: string;
}

const NewPane: Component<Props> = ({ className }) => (
  <div
    class={cx(
      `flex flex-col items-center justify-center bg-gradient-to-b from-transparent via-transparent to-blue-900/20 flex-grow`,
      className,
    )}
  >
    <img src={Logo} class="w-[200px] opacity-5" />
    <ul class="mt-8 flex flex-col gap-2">
      <KeyboardShortcut key="o" description="open file" />
      <KeyboardShortcut key="n" description="new file" />
      <KeyboardShortcut key="t" description="terminal" />
    </ul>
  </div>
);

export default NewPane;
