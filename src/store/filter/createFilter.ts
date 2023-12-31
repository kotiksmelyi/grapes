import { createEvent, createStore } from 'effector';
import { IDropdownItem } from '../../lib/types';

export const createFilter = () => {
  const setFilterOptions = createEvent();

  const $filters = createStore<IDropdownItem[]>([]).on(
    setFilterOptions,
    (_, payload) => payload
  );

  const setSelectedFilter = createEvent<number | string | null>();
  const selectFist = createEvent<IDropdownItem[]>();

  const $selectedFilter = createStore<number | string | null>(null)
    .on(setSelectedFilter, (_, payload) => payload)
    .on(selectFist, (_, payload) => (payload.length ? payload[0].value : null));

  return {
    $filters,
    selectFist,
    setFilterOptions,
    setSelectedFilter,
    $selectedFilter,
  };
};
