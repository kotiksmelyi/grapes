import { Chart, EChartsOption } from '../chart/Chart';
import styles from './Charts.module.css';
import { FC, useMemo } from 'react';

type Props = {
  name: string;
  min: number;
  max: number;
  data: any[];
  xAxis: string[];
  yAxis: string[];
};
export const HitMap: FC<Props> = (props) => {
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
      visualMap: {
        min: props.min,
        max: props.max,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '15%',
      },
      series: [
        {
          name: props.name,
          type: 'heatmap',
          data: props.data,
          label: {
            show: true,
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
