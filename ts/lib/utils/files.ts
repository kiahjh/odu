import PlainTextIcon from "/filetypes/plaintext.svg";
import RustIcon from "/filetypes/rust.svg";
import TypeScriptIcon from "/filetypes/typescript.svg";
import JavaScriptIcon from "/filetypes/javascript.svg";
import JsonIcon from "/filetypes/json.svg";
import HtmlIcon from "/filetypes/html.svg";
import TailwindIcon from "/filetypes/tailwind.svg";
import GitIcon from "/filetypes/git.svg";
import JavaScriptReactIcon from "/filetypes/javascriptreact.svg";
import TypeScriptReactIcon from "/filetypes/typescriptreact.svg";
import SwiftIcon from "/filetypes/swift.svg";
import type { EditorPaneType, PaneType } from "../types";

export type FileType =
  | `plaintext`
  | `markdown`
  | `typescript`
  | `javascript`
  | `rust`
  | `json`
  | `html`
  | `javascriptreact`
  | `typescriptreact`
  | `swift`;

export function fileName(path: string): string {
  return path.split(`/`).pop()!;
}

export function fileIcon(fileName: string): string {
  if (fileName === `tailwind.config.js`) return TailwindIcon;
  if (fileName === `.gitignore`) return GitIcon;

  const type = fileType(fileName);
  switch (type) {
    case `typescript`:
      return TypeScriptIcon;
    case `javascript`:
      return JavaScriptIcon;
    case `rust`:
      return RustIcon;
    case `json`:
      return JsonIcon;
    case `html`:
      return HtmlIcon;
    case `javascriptreact`:
      return JavaScriptReactIcon;
    case `typescriptreact`:
      return TypeScriptReactIcon;
    case `swift`:
      return SwiftIcon;
    default:
      return PlainTextIcon;
  }
}

export function fileType(fileName: string): FileType {
  const extension = fileName.split(`.`).pop()!;
  switch (extension) {
    case `ts`:
      return `typescript`;
    case `js`:
      return `javascript`;
    case `rs`:
      return `rust`;
    case `json`:
      return `json`;
    case `md`:
      return `markdown`;
    case `html`:
      return `html`;
    case `tsx`:
      return `typescriptreact`;
    case `jsx`:
      return `javascriptreact`;
    case `swift`:
      return `swift`;
    default:
      return `plaintext`;
  }
}

export function openFiles(rootPane: PaneType): Array<{
  path: string;
  pane: EditorPaneType;
}> {
  switch (rootPane.type) {
    case `new`:
    case `terminal`:
      return [];
    case `editor`:
      return rootPane.buffers.map((b) => ({
        path: b.filePath,
        pane: rootPane,
      }));
    case `split`:
      return rootPane.panes.flatMap((p) => openFiles(p));
  }
}
