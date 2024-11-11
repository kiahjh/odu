import { invoke } from "@tauri-apps/api/core";
import type { FileTreeNode } from "../types/rs/FileTreeNode";

type InvokeFn<InputType, OutputType> = (
  input: InputType,
) => Promise<OutputType>;

const crawlDir: InvokeFn<string, FileTreeNode> = async (path) => {
  return await invoke(`crawl_dir`, { path });
};

const loadFile: InvokeFn<string, string> = async (path) => {
  return await invoke(`load_file`, { path });
};

const writeFile: InvokeFn<{ path: string; contents: string }, void> = async ({
  path,
  contents,
}) => {
  return await invoke(`write_file`, { path, contents });
};

const rust = {
  crawlDir,
  loadFile,
  writeFile,
};

export default rust;
