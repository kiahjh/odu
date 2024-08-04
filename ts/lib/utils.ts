import type { Entity } from "./types";

export function idleEntity<T>(): Entity<T> {
  return { status: `idle` };
}
