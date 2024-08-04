import { Window } from "@tauri-apps/api/window";
import type { Component } from "solid-js";

const appWindow = new Window(`main`);

const TitleBar: Component = () => (
  <header
    data-tauri-drag-region
    class="flex py-1.5 px-1.5 items-center border-gray-700/50 border-t border-x rounded-t-lg border-b border-b-gray-800"
  >
    <div class="flex px-2 py-2 gap-2 group">
      <button
        class="w-3 h-3 rounded-full bg-gray-700 group-hover:bg-[#FF5F57] hover:!bg-[#DF3F37] transition-[background-color,border-color,transform] duration-100 active:scale-90"
        onClick={() => appWindow.close()}
      />
      <button
        class="w-3 h-3 rounded-full bg-gray-700 group-hover:bg-[#FEBC2E] hover:!bg-[#DE9C0E] transition-[background-color,border-color,transform] duration-100 active:scale-90"
        onClick={() => appWindow.minimize()}
      />
      <button
        class="w-3 h-3 rounded-full bg-gray-700 group-hover:bg-[#28C841] hover:!bg-[#08A821] transition-[background-color,border-color,transform] duration-100 active:scale-90"
        onClick={() => appWindow.toggleMaximize()}
      />
    </div>
  </header>
);

export default TitleBar;
