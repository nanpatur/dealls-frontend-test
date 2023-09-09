export interface QueryConfig<T> {
  enabled?: boolean;
  initialData?: T;
}

export interface QueryParams<T> {
  key: string | number | Array<string | number>;
  config?: QueryConfig<T>;
  params?: any;
}
