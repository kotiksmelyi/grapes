import { FC, useMemo } from 'react';
import { useStore } from 'effector-react';
import { dashboard } from '../../store/dataStore';
import { Chart, EChartsOption } from '../chart/Chart';
import styles from './Charts.module.css';

export const PieChart: FC = () => {
  const pieChart = useStore(dashboard.pieChart.$chart);
  const common = pieChart.reduce((prev, curr) => prev + curr.value, 0);

  console.log(pieChart);

  const options: EChartsOption = useMemo(() => {
    return {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        top: '10px',
        left: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
      },
      darkMode: true,
      texеСolor: 'white',
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
                return `${params.value}%`;
              },
            },
          },
          labelLine: {
            show: false,
          },
          data: pieChart.map((i) => ({
            value: ((i.value / common) * 100).toFixed(2),
            name: i.name,
          })),
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
