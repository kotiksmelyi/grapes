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
  ForecastMap,
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
    }: {
      date: string;
      illnes: number[];
      regions: number[];
    }) => {
      const res = await http.get<ForecastMap[]>(`/stats/forecast/map/${date}`, {
        params: { region_ids: regions },
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

  return {
    $regions,
    regionsDropdownStore,
    fetchRegionsFx,
    fetchForcastWorstFx: fetchForcastWorstFx,
    forcastWorst,

    forcastMap,
    fetchForcastMapFx,
    illnessStore,
    fetchIllnessOptionsFx,

    dateStore,
  };
};

export const dashboard = createDashboard();
