import type { Component } from "solid-js";
import type { EditorPaneType } from "../../../lib/types";
import { globalState } from "../../../lib/state/store";
import BufferTab from "./BufferTab";

interface Props {
  pane: EditorPaneType;
}

const EditorPane: Component<Props> = ({ pane }) => {
  const activeBuffer = pane.buffers.find((b) => b.active);
  const { dispatch } = globalState();
  return (
    <div class="flex flex-col flex-grow bg-gray-900">
      <nav class="bg-gray-950/60 flex">
        {pane.buffers.map((b) => (
          <BufferTab buffer={b} paneId={pane.id} />
        ))}
        <div class="flex-grow border-b border-gray-800" />
      </nav>
      <main class="text-white flex-grow">
        {activeBuffer ? (
          <textarea
            class="w-full h-full bg-transparent cursor-text outline-none p-8 font-mono resize-none"
            value={activeBuffer.content}
            onInput={(e) => {
              e.preventDefault();
              dispatch({
                type: `bufferEdited`,
                filePath: activeBuffer.filePath,
                newContent: e.target.value,
              });
            }}
          />
        ) : (
          <div class="w-full h-full flex justify-center items-center">
            <span class="text-gray-600">No active buffer</span>
          </div>
        )}
      </main>
    </div>
  );
};

export default EditorPane;
