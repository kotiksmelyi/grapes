import { FC, useMemo } from 'react';
import { useStore } from 'effector-react';
import { dashboard } from '../../store/dataStore';
import { Chart, EChartsOption } from '../chart/Chart';
import styles from './Charts.module.css';

export const BarChart: FC = () => {
  const worst = useStore(dashboard.forcastWorst);
  const region = useStore(dashboard.regionsDropdownStore.$selectedFilter);

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
      xAxis: {
        type: 'category',
        data: worst[0]?.illnesses.map((i) => i.name),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: worst[0]?.illnesses.map((i) => i.percent),
          type: 'bar',
          showBackground: true,
          color: '#5e963f',
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)',
          },
        },
      ],
    };
  }, [worst]);
  if (!region)
    return (
      <div style={{ color: 'white', margin: '20px 0' }}>
        Выберите регион для этого графика
      </div>
    );

  if (!worst.length) return null;

  return (
    <div className={styles.container}>
      <Chart option={options} />
    </div>
  );
};
