export type Id = number;

export type Entity<T> =
  | {
      status: `idle`;
    }
  | {
      status: `loading`;
    }
  | {
      status: `success`;
      data: T;
    }
  | {
      status: `error`;
      error: EntityError;
    };

export type EntityError = {
  message: string;
  code: number;
};

export type PaneType = (
  | {
      type: `new`;
      focused: boolean;
    }
  | {
      type: `editor`;
      buffers: Buffer[];
      focused: boolean;
    }
  | {
      type: `terminal`;
      focused: boolean;
    }
  | {
      type: `split`;
      direction: `horizontal` | `vertical`;
      panes: [PaneType, PaneType];
    }
) & {
  id: Id;
};
export type NewPaneType = Extract<PaneType, { type: `new` }>;
export type EditorPaneType = Extract<PaneType, { type: `editor` }>;
export type TerminalPaneType = Extract<PaneType, { type: `terminal` }>;
export type SplitPaneType = Extract<PaneType, { type: `split` }>;

export type Buffer = {
  filePath: string;
  content: string;
  active: boolean;
  isDirty: boolean;
  cursor:
    | {
        mode: `single`;
        position: CharacterPosition;
        selection: null | {
          start: CharacterPosition;
          end: CharacterPosition;
        };
      }
    | {
        mode: `multi`;
        positions: CharacterPosition[];
        selections: null | Array<{
          start: CharacterPosition;
          end: CharacterPosition;
        }>;
      };
};

export type CharacterPosition = {
  row: number;
  column: number;
};

export type Mode =
  | {
      type: `file-explorer`;
      subMode: `normal` | `rename` | `create-file` | `create-folder` | `delete`;
    }
  | {
      type: `editor`;
      subMode:
        | `normal`
        | `insert`
        | `visual`
        | `search`
        | `visual-line`
        | `visual-block`;
    }
  | {
      type: `new`;
    };
