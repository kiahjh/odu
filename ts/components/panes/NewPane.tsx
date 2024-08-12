import cx from "classnames";
import type { Component } from "solid-js";
import Logo from "/logo.svg";

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

interface KeyboardShortcutProps {
  key: string;
  description: string;
}

const KeyboardShortcut: Component<KeyboardShortcutProps> = ({
  key,
  description,
}) => (
  <li class="flex items-center gap-2">
    <div class="w-5 h-5 flex justify-center items-center rounded-md text-gray-300 pb-[3px] text-sm shadow-black/30 shadow font-medium bg-gradient-to-b from-gray-700 to-gray-800 border-t border-gray-600">
      {key}
    </div>
    <span class="font-mono text-gray-600">{description}</span>
  </li>
);
