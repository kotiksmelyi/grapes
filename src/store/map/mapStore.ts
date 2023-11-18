import { createEffect, createEvent, createStore } from 'effector';
import { http } from '../../lib/server/http';

export interface IRegionsValue {
  id: number;
  name: string;
  coords: [number, number][];
  code: string;
}

export const createMap = () => {
  const fetchRegionsFx = createEffect(async () => {
    const res = await http.get('/geography/regions');
    return res.data;
  });
  const $regions = createStore<IRegionsValue[]>([]).on(
    fetchRegionsFx.doneData,
    (_, payload) => payload
  );
  return { $regions, fetchRegionsFx };
};

export const mapStore = createMap();
