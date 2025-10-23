import type {
  QueryOptions as LibQueryOptions,
  UseQueryOptions,
} from "@tanstack/react-query";

export type QueryOptions<T> = Partial<LibQueryOptions<T>>;

export type QueryOptionsParams<T, U = {}> = Partial<UseQueryOptions<T>> & U;

export type TestOptions = Omit<UseQueryOptions, "queryKey"> & {
  queryKey: readonly unknown[];
};

export type CreateQueryOptions<T> = Partial<
  Omit<UseQueryOptions, "queryKey"> & {
    queryKey: readonly unknown[];
    variables?: T;
  }
>;
