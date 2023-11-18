import { FC } from 'react';
import { PieChart } from '../../components/Charts/PieChart';
import { BarChart } from '../../components/Charts/BarChart';
import { HitMap } from '../../components/Charts/HitMap';
import { useStore } from 'effector-react';
import { dashboard } from '../../store/dataStore';

export const ChartsPage: FC = () => {
  const hitmapPercent = useStore(dashboard.$hitmapPercent);
  const hitmapAmount = useStore(dashboard.$hitmapAmount);

  return (
    <div style={{ margin: '0 150px' }}>
      <BarChart />
      <PieChart />
      {hitmapPercent && (
        <HitMap
          name='tigr'
          xAxis={hitmapPercent.dates}
          yAxis={hitmapPercent.illnesses}
          data={hitmapPercent.data}
          min={hitmapPercent.min}
          max={hitmapPercent.max}
        />
      )}

      {hitmapAmount && (
        <HitMap
          name='tigr'
          xAxis={hitmapAmount.dates}
          yAxis={hitmapAmount.illnesses}
          data={hitmapAmount.data}
          min={hitmapAmount.min}
          max={hitmapAmount.max}
        />
      )}
    </div>
  );
};
