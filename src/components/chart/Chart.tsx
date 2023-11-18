import { FC, useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export type EChartsOption = echarts.EChartsOption;

interface IProps {
  option: EChartsOption;
}

export const Chart: FC<IProps> = ({ option }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);
      myChart.setOption(option);
    }
  }, [option]);

  return <div ref={chartRef} style={{ height: '100%' }} />;
};
