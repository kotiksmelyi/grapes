import { createFilter } from './filter/createFilter';
import {
  createEffect,
  createEvent,
  createStore,
  forward,
  sample,
} from 'effector';
import { http } from '../lib/server/http';
import { toDropdownOptions } from '../lib/utils/toDropdownOptions';
import { createChart } from './chart';
import {
  ForecastWorst,
  IBarChart,
  ILineChart,
  IPage,
  IPieChart,
} from '../lib/types';

export interface IRegionsValue {
  id: number;
  name: string;
  coords: [number, number][];
  code: string;
}

export const createDashboard = () => {
  const fetchRegionsFx = createEffect(async () => {
    const res = await http.get<IRegionsValue[]>('/geography/regions');
    return res.data;
  });

  const dateStore = createFilter('08-04-2021');

  const fetchForcastWorstFx = createEffect(
    async ({ date, regions }: { date: string; regions: number[] }) => {
      const res = await http.get<ForecastWorst[]>(
        `/stats/forecast/worst/${date}`,
        {
          params: { region_ids: regions },
        }
      );
      return res.data;
    }
  );

  const forcastWorst = createStore<ForecastWorst[]>([]).on(
    fetchForcastWorstFx.doneData,
    (_, payload) => payload
  );

  const fetchForcastMapFx = createEffect(
    async ({ date, regions }: { date: string; regions: number[] }) => {
      const res = await http.get<ForecastWorst[]>(
        `/stats/forecast/map/${date}`,
        {
          params: { region_ids: regions },
        }
      );
      return res.data;
    }
  );

  const forcastMap = createStore<ForecastWorst[]>([]).on(
    fetchForcastWorstFx.doneData,
    (_, payload) => payload
  );

  const $regions = createStore<IRegionsValue[]>([]).on(
    fetchRegionsFx.doneData,
    (_, payload) => payload
  );

  const regionsDropdownStore = createFilter();

  sample({
    source: [dateStore.$selectedFilter, regionsDropdownStore.$selectedFilter],
    fn: ([date, regions]) => ({ date, regions }),
    target: [fetchForcastWorstFx, fetchForcastMapFx],
  });

  sample({
    clock: $regions,
    fn: toDropdownOptions,
    target: [regionsDropdownStore.setFilterOptions],
  });

  const fetchFeatureFx = createEffect(async () => {
    const res = await http.get('/stats/features');
    return toDropdownOptions(res.data);
  });

  const featureStore = createFilter();

  forward({
    from: fetchFeatureFx.doneData,
    to: featureStore.setFilterOptions,
  });
  sample({
    clock: fetchFeatureFx.doneData,
    fn: (source) => source[0].value,
    target: featureStore.setSelectedFilter,
  });

  const fetchBarChartFx = createEffect(
    async ({ feature, order }: { feature?: number; order?: boolean }) => {
      const res = await http.get<IPage<IBarChart>>('/stats/feature-values', {
        params: {
          feature,
          order: order ? 'value' : '-value',
          limit: 10,
        },
      });
      return res.data.results;
    }
  );

  const barChart = createChart<IBarChart>();

  forward({
    from: fetchBarChartFx.doneData,
    to: barChart.setChartOptions,
  });

  const setOrder = createEvent<boolean>();
  const $order = createStore<boolean>(false).on(
    setOrder,
    (_, payload) => payload
  );

  const fetchPieChartFx = createEffect(
    async ({ feature, region }: { feature: number; region: number }) => {
      const res = await http.get<IPage<IPieChart>>(
        '/stats/feature-values/children',
        {
          params: {
            limit: 10,
            feature__parent_feature: feature,
            region,
          },
        }
      );
      return res.data.results;
    }
  );
  const fetchLineChartFx = createEffect(
    async ({ feature, region }: { feature: number; region: number }) => {
      const res = await http.get<IPage<IPieChart>>(
        '/stats/feature-values/yearly',
        {
          params: {
            feature: feature,
            region,
          },
        }
      );
      return res.data;
    }
  );

  const pieChart = createChart<IPieChart>();

  forward({
    from: fetchPieChartFx.doneData,
    to: pieChart.setChartOptions,
  });
  sample({
    source: [
      regionsDropdownStore.$selectedFilter,
      featureStore.$selectedFilter,
    ],
    fn: (source) => ({
      region: source[0] !== null ? source[0] : 1,
      feature: source[1] !== null ? source[1] : 1,
    }),
    target: [fetchPieChartFx, fetchLineChartFx],
  });

  const fetchAnalysisFx = createEffect(async (id: number | null) => {
    const res = await http.get('/analysis/analysis', {
      params: { region_id: id },
    });
    return res.data;
  });

  const $analysis = createStore<
    {
      text: string;
      plot: { data: any; layout: any };
      status: 'bad' | 'good' | 'ok';
    }[]
  >([]).on(fetchAnalysisFx.doneData, (_, payload) => payload);

  forward({
    from: regionsDropdownStore.$selectedFilter,
    to: fetchAnalysisFx,
  });

  const lineChart = createChart<ILineChart>();

  return {
    $regions,
    featureStore,
    regionsDropdownStore,
    fetchRegionsFx,
    fetchFeatureFx,
    pieChart,
    barChart,
    fetchPieChartFx,
    fetchBarChartFx,
    setOrder,
    $order,
    fetchForcastWorstFx: fetchForcastWorstFx,
    forcastWorst,
    $analysis,
    fetchAnalysisFx,

    forcastMap,
    fetchForcastMapFx,

    lineChart,
    fetchLineChartFx,
    dateStore,
  };
};

export const dashboard = createDashboard();
