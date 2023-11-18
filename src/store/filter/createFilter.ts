import { createEvent, createStore } from 'effector';
import { IDropdownItem } from '../../lib/types';

export const createFilter = (defaultValue: string | number | undefined) => {
  const setFilterOptions = createEvent();

  const $filters = createStore<IDropdownItem[]>([]).on(
    setFilterOptions,
    (_, payload) => payload
  );

  const setSelectedFilter = createEvent<number>();
  const selectFist = createEvent<IDropdownItem[]>();

  const $selectedFilter = createStore<number | string | null>(
    defaultValue || null
  )
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
