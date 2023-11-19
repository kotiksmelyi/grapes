import { Chart, EChartsOption } from '../chart/Chart';
import styles from './Charts.module.css';
import { FC, useMemo } from 'react';

type Props = {
  name: string;
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
          max: 10,
          orient: 'horizontal',
          calculable: true,
          left: '25%',
          bottom: '15%',
          seriesIndex: 0,
          inRange: {
            color: ['#89e159', '#FF4D4D'],
          },
          dimension: '2',
        },
        {
          min: props.min,
          max: props.max,
          calculable: true,
          orient: 'horizontal',
          right: '15%',
          bottom: '15%',
          seriesIndex: 1,
          inRange: {
            color: ['rgba(137, 225, 89, 0.5)', 'rgba(255, 77, 77, 0.5)'],
          },
          dimension: '2',
        },
      ],
      series: [
        {
          name: props.name,
          type: 'heatmap',
          data: props.data1,
          label: {
            show: true,
            formatter: (value) => {
              props.isPercent ? `${value}%` : value;
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
          name: props.name,
          type: 'heatmap',
          data: props.data2,

          label: {
            show: true,

            formatter: (value) => {
              props.isPercent ? `${value}%` : value;
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
      <Chart option={options} />
    </div>
  );
};
