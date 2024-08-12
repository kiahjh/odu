import cx from "classnames";
import { XIcon } from "lucide-solid";
import { type Component } from "solid-js";
import type { Buffer as BufferType, Id } from "../../../lib/types";
import { fileIcon, fileName } from "../../../lib/utils/files";
import { globalState } from "../../../lib/state/store";

const BufferTab: Component<{ buffer: BufferType; paneId: Id }> = (props) => {
  const { dispatch } = globalState();

  return (
    <div
      onClick={() =>
        dispatch({
          type: `bufferTabClicked`,
          filePath: props.buffer.filePath,
          paneId: props.paneId,
        })
      }
      class={cx(
        `pl-4 pr-3 py-1.5 border-x border-b flex items-center border-t-2 shrink-0`,
        props.buffer.active
          ? `bg-gray-900 text-gray-300 border-x-gray-800 border-b-transparent`
          : `border-x-transparent border-b-gray-800 text-gray-500 hover:bg-gray-900/70`,
        props.buffer.isDirty ? `border-t-blue-500/60` : `border-transparent`,
      )}
    >
      <img
        src={fileIcon(fileName(props.buffer.filePath))}
        class="w-4 h-4 mr-2.5"
      />
      <span>{fileName(props.buffer.filePath)}</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          dispatch({
            type: `bufferTabCloseClicked`,
            filePath: props.buffer.filePath,
            paneId: props.paneId,
          });
        }}
        class="w-5 h-5 hover:bg-gray-800 rounded-md flex justify-center items-center ml-4 text-gray-500 hover:text-gray-400 group active:bg-gray-700"
      >
        <XIcon class="w-4" />
      </button>
    </div>
  );
};

export default BufferTab;
