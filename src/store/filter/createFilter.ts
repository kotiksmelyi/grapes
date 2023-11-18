import { createEvent, createStore } from 'effector';
import { IDropdownItem } from '../../lib/types';

export const createFilter = () => {
  const setFilterOptions = createEvent();

  const $filters = createStore<IDropdownItem[]>([]).on(
    setFilterOptions,
    (_, payload) => payload
  );

  const setSelectedFilter = createEvent<number>();
  const $selectedFilter = createStore<number | null>(null).on(
    setSelectedFilter,
    (_, payload) => payload
  );

  return { $filters, setFilterOptions, setSelectedFilter, $selectedFilter };
};
