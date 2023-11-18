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

export interface ForecastMap {
  illnesses: {
    name: string;
    percent: number;
  }[];
  region: {
    id: number;
    name: string;
    code: string;
  };
  color: string;
}
export interface ForecastWorst {
  date: string;
  illnesses: Illness[];
  weather_forecast: any;
  region: Region;
}

export interface Illness {
  name: string;
  percent: number;
}

export interface WeatherForecast {
  T: number;
  U: number;
  WW: string;
}

export interface Region {
  id: number;
  name: string;
  code: string;
}
