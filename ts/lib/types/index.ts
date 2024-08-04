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
