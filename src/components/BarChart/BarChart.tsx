import React from 'react';

export const BarChart = (props: {}) => {
  const options: EChartsOption = useMemo(() => {
    return {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        top: '1%',
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
