export interface TableColumn<T> {
  title: string;
  dataKey: keyof T;
  render?: (value: T[keyof T], row: T) => JSX.Element;
}

export interface TableProps {
  data: any[];
  columns: TableColumn<any>[];
  totalData?: number;
  limit?: number;
  onPaginate?: (page: number) => void;
  page?: number;
}
