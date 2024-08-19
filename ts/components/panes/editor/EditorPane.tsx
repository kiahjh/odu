import { codeToTokens, FontStyle } from "shiki";
import { createEffect, createSignal, type Component } from "solid-js";
import cx from "classnames";
import type { TokensResult } from "shiki";
import type { EditorPaneType } from "../../../lib/types";
import { fileName, fileType, shikiFileType } from "../../../lib/utils/files";
import BufferTab from "./BufferTab";
import Cursor from "./Cursor";

interface Props {
  pane: EditorPaneType;
}

const EditorPane: Component<Props> = (props) => {
  const activeBuffer = props.pane.buffers.find((b) => b.active);
  const [tokens, setTokens] = createSignal<TokensResult | null>(null);

  createEffect(async () => {
    setTokens(
      await codeToTokens(activeBuffer?.content ?? ``, {
        lang: shikiFileType(
          fileType(fileName(activeBuffer?.filePath ?? ``)) ?? `plaintext`,
        ),
        theme: `catppuccin-mocha`,
      }),
    );
  });

  return (
    <div class="flex flex-col flex-grow bg-gray-900">
      <nav class="bg-gray-950/60 flex">
        {props.pane.buffers.map((b) => (
          <BufferTab buffer={b} paneId={props.pane.id} />
        ))}
        <div class="flex-grow border-b border-gray-800" />
      </nav>
      <main class="text-white flex-grow">
        {activeBuffer ? (
          <div class="w-full h-full bg-transparent [&_*]:cursor-text outline-none py-4 font-mono resize-none flex flex-col relative [font-variant-numeric:tabular-nums]">
            {tokens()?.tokens.map((line, i) => {
              const highlighted =
                activeBuffer.cursor.mode === `single`
                  ? activeBuffer.cursor.position.row === i
                  : activeBuffer.cursor.positions.some((p) => p.row === i);
              return (
                <div
                  class={cx(
                    `flex h-[22px] hover:outline outline-1 outline-gray-800 hover:bg-gray-800/20`,
                    highlighted &&
                      `bg-blue-500/10 !outline-blue-400/20 hover:!bg-blue-500/10`,
                  )}
                >
                  <div
                    class={cx(
                      `flex justify-end w-10 mr-4 text-[15px] items-center`,
                      highlighted ? `text-blue-300` : `text-gray-700`,
                    )}
                  >
                    {i + 1}
                  </div>
                  {line.map((token) => (
                    <span
                      style={{
                        color: token.color,
                        "font-style": (() => {
                          switch (token.fontStyle) {
                            case FontStyle.Italic:
                              return `italic`;
                            case FontStyle.Bold:
                              return `bold`;
                            default:
                              return ``;
                          }
                        })(),
                      }}
                      class="text-[15px]"
                    >
                      {token.content.replace(/\s/g, `\u00a0`)}
                    </span>
                  ))}
                </div>
              );
            })}
            {activeBuffer.cursor.mode === `single` ? (
              <Cursor position={activeBuffer.cursor.position} />
            ) : null}
          </div>
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
