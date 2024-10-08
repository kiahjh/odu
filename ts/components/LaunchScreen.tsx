import { open } from "@tauri-apps/plugin-dialog";
import { Show, type Component } from "solid-js";
import { LoaderIcon } from "lucide-solid";
import Img from "/logo.svg";
import { globalState } from "../lib/state/store";

const LaunchScreen: Component = () => {
  const { dispatch, state } = globalState();

  return (
    <div class="flex-grow flex justify-center flex-col items-center">
      <img src={Img} class="opacity-5 w-[300px]" />
      <p class="text-gray-600 text-lg mt-8 font-mono max-w-[400px] text-center">
        A fast, beautiful, and productive code editor.
      </p>
      <div class="h-20">
        <Show when={state.fileTree.status === `loading`}>
          <LoaderIcon class="text-gray-600 text-3xl mt-12 animate-spin" />
        </Show>
        <Show when={state.fileTree.status === `idle`}>
          <button
            onClick={async () => {
              dispatch({ type: `openDirectoryButtonClicked` });
              const directory = await open({
                multiple: false,
                directory: true,
              });
              if (directory) {
                dispatch({ type: `directoryLoaded`, directoryPath: directory });
              }
            }}
            class="mt-12 bg-gradient-to-b from-blue-800 to-blue-900/70 px-6 py-2.5 rounded-xl text-lg font-medium text-blue-200 hover:scale-[102%] transition-[transform,box-shadow] duration-200 active:scale-[98%] shadow-black/30 shadow-md border-t border-blue-600 hover:shadow-xl active:shadow-sm"
          >
            Open directory
          </button>
        </Show>
      </div>
    </div>
  );
};

export default LaunchScreen;
