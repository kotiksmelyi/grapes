import { FC } from 'react';
import { PieChart } from '../../components/Charts/PieChart';
import { BarChart } from '../../components/Charts/BarChart';
import { HeatMap } from '../../components/Charts/HeatMap';
import { useStore } from 'effector-react';
import { dashboard } from '../../store/dataStore';

export const ChartsPage: FC = () => {
  const heatmapPercent = useStore(dashboard.$heatmapPercent);
  const heatmapAmount = useStore(dashboard.$heatmapAmount);
  console.log(heatmapPercent, heatmapAmount);

  return (
    <div style={{ margin: '0 150px' }}>
      <BarChart />
      <PieChart />
      {heatmapPercent && (
        <HeatMap
          xAxis={heatmapPercent.dates}
          yAxis={heatmapPercent.illnesses}
          data1={heatmapPercent.data}
          data2={heatmapPercent.forecast}
          min={heatmapPercent.min}
          max={heatmapPercent.max}
        />
      )}

      {heatmapAmount && (
        <HeatMap
          xAxis={heatmapAmount.dates}
          yAxis={heatmapAmount.illnesses}
          data1={heatmapAmount.data}
          data2={heatmapAmount.forecast}
          min={heatmapAmount.min}
          max={heatmapAmount.max}
        />
      )}
    </div>
  );
};
