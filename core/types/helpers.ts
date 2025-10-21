export type Nullable<T> = T | null;

export type PageSearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;
