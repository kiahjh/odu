import { FolderIcon, FolderOpenIcon } from "lucide-solid";
import { createSignal, type Component } from "solid-js";
import type { FileTreeNode } from "../lib/types/rs/FileTreeNode";
import { fileName, fileIcon } from "../lib/utils/files";
import { globalState } from "../lib/state/store";

interface Props {
  fileTree: FileTreeNode;
}

const FileExplorer: Component<Props> = ({ fileTree }) => (
  <div class="w-80 bg-gray-950/30 text-white p-4 border-r border-gray-800 overflow-scroll max-h-[calc(100vh-32px-42px)] shrink-0">
    {fileTree.type === `directory` &&
      fileTree.children
        .filter<FileTreeNode>(
          (child): child is Extract<FileTreeNode, { type: `directory` }> =>
            child.type === `directory`,
        )
        .sort((a, b) => a.path.localeCompare(b.path))
        .concat(
          fileTree.children
            .filter((child) => child.type === `file`)
            .sort((a, b) => a.path.localeCompare(b.path)),
        )
        .map((child) =>
          child.type === `file` ? (
            <File path={child.path} />
          ) : (
            <Folder path={child.path} children={child.children} />
          ),
        )}
  </div>
);

export default FileExplorer;

interface FileProps {
  path: string;
}

const File: Component<FileProps> = ({ path }) => {
  const { dispatch } = globalState();
  return (
    <div
      onClick={async () => {
        dispatch({
          type: `fileInExplorerClicked`,
          filePath: path,
        });
      }}
      class="flex items-center gap-2 hover:bg-gray-800/40 rounded-lg px-2 py-[3px]"
    >
      <img src={fileIcon(fileName(path))} class="w-4 h-4" />
      <span class="text-gray-400">{fileName(path)}</span>
    </div>
  );
};

interface FolderProps {
  path: string;
  children: FileTreeNode[];
}

const Folder: Component<FolderProps> = ({ path, children }) => {
  const [open, setOpen] = createSignal(false);

  return (
    <div>
      <div
        onClick={() => setOpen(!open())}
        class="flex gap-2 items-center hover:bg-gray-800/40 rounded-lg px-2 py-[3px]"
      >
        {open() ? (
          <FolderOpenIcon class="w-4 h-4 text-gray-600" />
        ) : (
          <FolderIcon class="w-4 h-4 text-gray-600" />
        )}
        <span class="text-gray-500">{fileName(path)}</span>
      </div>
      {open() && (
        <div class="ml-3.5 pl-1.5 border-l border-gray-800">
          {children
            .filter<FileTreeNode>(
              (child): child is Extract<FileTreeNode, { type: `directory` }> =>
                child.type === `directory`,
            )
            .sort((a, b) => a.path.localeCompare(b.path))
            .concat(
              children
                .filter((child) => child.type === `file`)
                .sort((a, b) => a.path.localeCompare(b.path)),
            )
            .map((child) =>
              child.type === `file` ? (
                <File path={child.path} />
              ) : (
                <Folder path={child.path} children={child.children} />
              ),
            )}
        </div>
      )}
    </div>
  );
};
