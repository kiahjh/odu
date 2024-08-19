import cx from "classnames";
import type { Component } from "solid-js";

interface KeyboardShortcutProps {
  key: string;
  description: string;
  bottomBar?: boolean;
}

const KeyboardShortcut: Component<KeyboardShortcutProps> = ({
  key,
  description,
  bottomBar = false,
}) => (
  <li class="flex items-center gap-2">
    <div
      class={cx(
        `flex justify-center items-center text-gray-300 shadow-black/30 shadow font-medium border-t`,
        bottomBar
          ? `px-[5px] h-4 rounded text-xs bg-black border-white/30 font-mono`
          : `w-5 h-5 rounded-md text-sm pb-[3px] bg-gradient-to-b from-gray-700 to-gray-800 border-gray-600`,
      )}
    >
      {key}
    </div>
    <span
      class={cx(
        bottomBar
          ? `text-sm text-white/40`
          : `text-base font-mono text-gray-600`,
      )}
    >
      {description}
    </span>
  </li>
);

export default KeyboardShortcut;
