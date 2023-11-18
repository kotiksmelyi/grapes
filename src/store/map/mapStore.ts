import { createEffect, createEvent, createStore } from 'effector';
import { http } from '../../lib/server/http';

export interface IRegionsValue {
  id: number;
  value: number;
  region_code: string;
  region_name: string;
  color: string;
}

export const createMap = () => {
  const fetchRegionsFx = createEffect(async (id: number) => {
    const res = await http.get<IRegionsValue[]>(
      '/stats/feature-values/map?feature=' + id
    );
    return res.data;
  });
  const $regions = createStore<IRegionsValue[]>([]).on(
    fetchRegionsFx.doneData,
    (_, payload) => payload
  );
  return { $regions, fetchRegionsFx };
};

export const mapStore = createMap();
