import cx from "classnames";
import { XIcon } from "lucide-solid";
import { type Component } from "solid-js";
import type {
  Buffer as BufferType,
  EditorPaneType,
  Id,
} from "../../../lib/types";
import { fileIcon, fileName } from "../../../lib/utils/files";
import { globalState } from "../../../lib/state/store";

const BufferTab: Component<{
  pane: EditorPaneType;
  buffer: BufferType;
  paneId: Id;
  index: number;
}> = (props) => {
  const { dispatch } = globalState();

  const indexOfActiveBuffer =
    props.pane.buffers.findIndex((b) => b.active) ?? 0;

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
          ? `text-gray-300 border-transparent`
          : `border-b-gray-800 text-gray-500 hover:text-gray-400 !bg-gray-950/60`,
        props.index === indexOfActiveBuffer - 1 &&
          `border-r-gray-800 rounded-br-xl`,
        props.index === indexOfActiveBuffer + 1 &&
          `border-l-gray-800 rounded-bl-xl`,
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
