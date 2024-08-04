import type { Component } from "solid-js";
import TitleBar from "./components/TitleBar";
import LaunchScreen from "./components/LaunchScreen";
import BottomBar from "./components/BottomBar";
import { globalState } from "./lib/state/store";
import FileExplorer from "./components/FileExplorer";
import Pane from "./components/Pane";

const App: Component = () => {
  const { state } = globalState();

  return (
    <div class="bg-gray-900 rounded-lg h-screen w-screen flex flex-col overflow-hidden">
      <TitleBar />
      <main class="flex-grow flex flex-col border-x border-gray-700/50">
        {state.fileTree.status === `success` ? (
          <div class="flex flex-grow">
            <FileExplorer />
            <Pane type="new" className="flex-grow" />
          </div>
        ) : (
          <LaunchScreen />
        )}
      </main>
      <BottomBar />
    </div>
  );
};

export default App;
