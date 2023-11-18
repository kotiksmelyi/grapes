export interface IDropdownItem {
  value: number;
  label: string;
}

export interface IPage<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}

export interface IBarChart {
  name: string;
  value: number;
}

export interface IPieChart {
  name: string;
  value: number;
}

export interface ILineChart {
  name: string;
  value: number;
}
