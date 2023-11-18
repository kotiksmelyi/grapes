import { FC, useMemo } from 'react';
import { useStore } from 'effector-react';
import { dashboard } from '../../store/dataStore';
import { Chart, EChartsOption } from '../chart/Chart';
import styles from './PieChartContainer.module.css';

export const PieChartContainer: FC = () => {
  const pieChart = useStore(dashboard.pieChart.$chart);

  const options: EChartsOption = useMemo(() => {
    return {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        top: '1%',
        left: 'center',
      },
      series: [
        {
          type: 'pie',
          radius: ['30%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },

          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold',
              formatter: function (params) {
                return params.value;
              },
            },
          },
          labelLine: {
            show: false,
          },
          data: pieChart,
        },
      ],
    };
  }, [pieChart]);

  if (!pieChart.length) return null;

  return (
    <div className={styles.container}>
      <Chart option={options} />
    </div>
  );
};
