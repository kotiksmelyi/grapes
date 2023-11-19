import { createFilter } from './filter/createFilter';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { http } from '../lib/server/http';
import { toDropdownOptions } from '../lib/utils/toDropdownOptions';
import { ForecastMap, ForecastWorst } from '../lib/types';
import { createChart } from './chart';
import dayjs from 'dayjs';

export interface IRegionsValue {
  id: number;
  name: string;
  coords: [number, number][];
  code: string;
}
export const formatTemplate = 'DD-MM-YYYY';

export const createDashboard = () => {
  const fetchRegionsFx = createEffect(async () => {
    const res = await http.get<IRegionsValue[]>('/geography/regions');
    return res.data;
  });

  const dateStore = createFilter();

  const illnessStore = createFilter();

  const fetchIllnessOptionsFx = createEffect(async () => {
    const res = await http.get('/stats/illnesses');
    return res.data;
  });

  illnessStore.$filters.on(fetchIllnessOptionsFx.doneData, (_, payload) =>
    payload.map((i) => ({ value: i.id, label: i.name }))
  );

  const fetchForcastWorstFx = createEffect(
    async ({
      date,
      regions,
      illness,
    }: {
      date: string;
      illness: number[];
      regions: number[];
    }) => {
      const res = await http.get<ForecastWorst[]>(
        `/stats/forecast/worst/${date}`,
        {
          params: { region_ids: regions, illness_ids: illness },
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
    async ({
      date,
      regions,
      illness,
    }: {
      date: string;
      illness: number[];
      regions: number[];
    }) => {
      const res = await http.get<ForecastMap[]>(`/stats/forecast/map/${date}`, {
        params: { region_ids: regions, illness_ids: illness },
      });
      return res.data;
    }
  );

  const forcastMap = createStore<ForecastMap[]>([]).on(
    fetchForcastMapFx.doneData,
    (_, payload) => payload
  );

  const $regions = createStore<IRegionsValue[]>([]).on(
    fetchRegionsFx.doneData,
    (_, payload) => payload
  );

  const regionsDropdownStore = createFilter();

  sample({
    source: [
      dateStore.$selectedFilter,
      illnessStore.$selectedFilter,
      regionsDropdownStore.$selectedFilter,
    ],
    fn: ([date, illness, regions]) => ({ date, illness, regions }),
    target: [fetchForcastWorstFx, fetchForcastMapFx],
  });

  sample({
    clock: $regions,
    fn: toDropdownOptions,
    target: [regionsDropdownStore.setFilterOptions],
  });

  const pieChart = createChart();

  const fetchHeatmapPercent = createEffect(async (date: string) => {
    const res = await http.get(`stats/heatmap/${date}`, {
      params: { mode: 'percent' },
    });
    return res.data;
  });

  const $heatmapPercent = createStore<any>(null).on(
    fetchHeatmapPercent.doneData,
    (_, payload) => payload
  );

  const fetchHeatmapAmount = createEffect(async (date: string) => {
    const res = await http.get(`stats/heatmap/${date}`, {
      params: { mode: 'amount' },
    });
    return res.data;
  });
  const $heatmapAmount = createStore<any>(null).on(
    fetchHeatmapAmount.doneData,
    (_, payload) => payload
  );

  sample({
    clock: dateStore.$selectedFilter,
    filter: (date) => dayjs().format(formatTemplate) !== date,
    target: [fetchHeatmapAmount, fetchHeatmapPercent],
  });

  sample({
    clock: fetchForcastWorstFx.doneData,
    fn: (data) =>
      data[0].illnesses.map((i) => ({ value: i.percent, name: i.name })),
    target: pieChart.setChartOptions,
  });
  return {
    $heatmapAmount: $heatmapAmount,
    $heatmapPercent: $heatmapPercent,
    $regions,
    regionsDropdownStore,
    fetchRegionsFx,
    fetchForcastWorstFx: fetchForcastWorstFx,
    forcastWorst,
    pieChart,

    forcastMap,
    fetchForcastMapFx,
    illnessStore,
    fetchIllnessOptionsFx,

    dateStore,
  };
};

export const dashboard = createDashboard();
