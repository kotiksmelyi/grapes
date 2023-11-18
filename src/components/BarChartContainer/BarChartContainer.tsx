import { FC, useMemo } from 'react';
import styles from './BarChartContainer.module.css';
import { Checkbox } from 'antd';
import { Chart, EChartsOption } from '../chart/Chart';
import { useStore } from 'effector-react';
import { dashboard } from '../../store/dataStore';

export const BarChartContainer: FC = () => {
  const barChart = useStore(dashboard.barChart.$chart);
  const order = useStore(dashboard.$order);

  const options: EChartsOption = useMemo(() => {
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: barChart.map((i) => i.name),
          axisTick: {
            alignWithLabel: true,
          },
          axisLabel: { interval: 0, rotate: 30 },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          type: 'bar',
          barWidth: '60%',
          data: barChart.map((i) => i.value),
        },
      ],
    };
  }, [barChart]);

  return (
    <div className={styles.container}>
      <div className={styles.checkboxes}>
        <Checkbox
          checked={order}
          onChange={(e) => dashboard.setOrder(e.target.checked)}
        >
          Выбрать регионы с наихудшими показателями
        </Checkbox>
      </div>
      <div className={styles.chart}>
        <Chart option={options} />
      </div>
    </div>
  );
};
