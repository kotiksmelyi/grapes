import { createEffect, createEvent, createStore } from 'effector';
import { http } from '../../lib/server/http';

export interface IRegionsValue {
  id: number;
  name: string;
  coords: {
    additionalProp1: string;
    additionalProp2: string;
    additionalProp3: string;
  };
  code: string;
}

export const createMap = () => {
  const fetchRegionsFx = createEffect(async (id: number) => {
    const res = await http.get<IRegionsValue[]>('/geography/regions');
    return res.data;
  });
  const $regions = createStore<IRegionsValue[]>([]).on(
    fetchRegionsFx.doneData,
    (_, payload) => payload
  );
  return { $regions, fetchRegionsFx };
};

export const mapStore = createMap();
