import { Chart, EChartsOption } from '../chart/Chart';
import styles from './Charts.module.css';
import { FC, useMemo } from 'react';

type Props = {
  min: number;
  max: number;
  data1: any[];
  data2: any[];
  xAxis: string[];
  yAxis: string[];
  isPercent?: boolean;
};
export const HeatMap: FC<Props> = (props) => {
  const options: EChartsOption = useMemo(() => {
    return {
      textStyle: { color: 'white' },
      tooltip: {
        position: 'top',
      },
      grid: {
        left: '20%',
        height: '65%',
        top: '10%',
      },
      xAxis: {
        type: 'category',
        data: props.xAxis,
        splitArea: {
          show: true,
        },
      },
      yAxis: {
        type: 'category',
        data: props.yAxis,
        splitArea: {
          show: true,
        },
      },
      visualMap: [
        {
          min: props.min,
          max: props.max,
          textStyle: { color: 'white' },
          orient: 'horizontal',
          calculable: true,
          left: '25%',
          bottom: '10%',
          seriesIndex: 0,
          inRange: {
            color: ['#89e159', '#FF4D4D'],
          },
          dimension: '2',
        },
        {
          min: props.min,
          max: props.max,
          textStyle: { color: 'white' },
          calculable: true,
          orient: 'horizontal',
          right: '15%',
          bottom: '10%',
          seriesIndex: 1,
          inRange: {
            color: ['rgba(137, 225, 89, 0.5)', 'rgba(255, 77, 77, 0.5)'],
          },
          dimension: '2',
        },
      ],
      series: [
        {
          type: 'heatmap',
          data: props.data1,
          label: {
            show: true,
            formatter: (value) => {
              const v = value.data[2];
              return props.isPercent ? `${v}%` : v;
            },
          },

          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
        {
          type: 'heatmap',
          data: props.data2,

          label: {
            show: true,
            formatter: (value) => {
              const v = value.data[2];
              return props.isPercent ? `${v}%` : v;
            },
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
  }, [props]);

  return (
    <div className={styles.container}>
      <span style={{ left: '23%' }} className={styles.text}>
        Фактические значения
      </span>

      <span style={{ right: '12%' }} className={styles.text}>
        Прогнозируемые значения
      </span>

      <Chart option={options} />
    </div>
  );
};
