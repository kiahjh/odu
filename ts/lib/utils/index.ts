import type { Entity, Id, PaneType } from "../types";

export function idleEntity<T>(): Entity<T> {
  return { status: `idle` };
}

export function focusedPane(
  rootPane: PaneType,
): Exclude<PaneType, { type: `split` }> | null {
  switch (rootPane.type) {
    case `new`:
    case `editor`:
    case `terminal`:
      if (rootPane.focused) {
        return rootPane;
      } else {
        return null;
      }
    case `split`:
      return focusedPane(rootPane.panes[0]) ?? focusedPane(rootPane.panes[1]);
    default:
      return null;
  }
}

export function updatePane(
  rootPane: PaneType,
  id: Id,
  newPane: PaneType,
): PaneType {
  if (rootPane.id === id) {
    return newPane;
  } else if (rootPane.type === `split`) {
    return {
      ...rootPane,
      panes: [
        updatePane(rootPane.panes[0], id, newPane),
        updatePane(rootPane.panes[1], id, newPane),
      ],
    };
  }
  return rootPane;
}

export function largestPaneId(rootPane: PaneType): Id {
  switch (rootPane.type) {
    case `new`:
    case `editor`:
    case `terminal`:
      return rootPane.id;
    case `split`:
      return Math.max(
        largestPaneId(rootPane.panes[0]),
        largestPaneId(rootPane.panes[1]),
      );
  }
}
