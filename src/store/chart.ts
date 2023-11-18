import { createEvent, createStore } from 'effector';

export const createChart = <T>() => {
  const setChartOptions = createEvent<T[]>();
  const $chart = createStore<T[]>([]).on(
    setChartOptions,
    (_, payload) => payload
  );
  return {
    setChartOptions,
    $chart,
  };
};
