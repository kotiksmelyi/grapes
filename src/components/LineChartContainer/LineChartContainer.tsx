import { FC, useMemo } from 'react';
import { Chart } from '../chart/Chart';
import { useStore } from 'effector-react';
import { dashboard } from '../../store/dataStore';
import styles from './LineChartContainer.module.css';
export const LineChartContainer: FC = () => {
  const lineChart = useStore(dashboard.lineChart.$chart);

  const options = useMemo(() => {
    return {
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: lineChart.map((i) => i.name),
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      toolbox: {},
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: lineChart.map((i) => i.name),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          type: 'line',
          stack: 'Total',
          data: lineChart.map((i) => i.value),
        },
      ],
    };
  }, [lineChart]);
  return (
    <div className={styles.container}>
      <Chart option={options} />
    </div>
  );
};
