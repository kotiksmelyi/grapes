import { FC } from 'react';
import { PieChart } from '../../components/Charts/PieChart';
import { BarChart } from '../../components/Charts/BarChart';
import { HeatMap } from '../../components/Charts/HeatMap';
import { useStore } from 'effector-react';
import { dashboard, formatTemplate } from '../../store/dataStore';
import dayjs from 'dayjs';

export const ChartsPage: FC = () => {
  const heatmapPercent = useStore(dashboard.$heatmapPercent);
  const heatmapAmount = useStore(dashboard.$heatmapAmount);
  const selectedRegion = useStore(
    dashboard.regionsDropdownStore.$selectedFilter
  );

  const selectedDate = useStore(dashboard.dateStore.$selectedFilter);

  const isToday = dayjs().format(formatTemplate) === selectedDate;

  return (
    <div style={{ margin: '0 150px' }}>
      {selectedRegion && (
        <div>
          <h2
            style={{
              color: '#89E159',
              fontWeight: '400',
              marginBottom: '24px',
            }}
          >
            Соотношение заболеваний в выбранном регионе
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
            }}
          >
            <BarChart />
            <PieChart />
          </div>
        </div>
      )}
      {heatmapPercent && !isToday && (
        <div>
          <h2
            style={{
              color: '#89E159',
              fontWeight: '400',
              marginBottom: '24px',
            }}
          >
            Распространенность болезней во всех регионах (процент)
          </h2>

          <HeatMap
            isPercent
            xAxis={heatmapPercent.dates}
            yAxis={heatmapPercent.illnesses}
            data1={heatmapPercent.data}
            data2={heatmapPercent.forecast}
            min={heatmapPercent.min}
            max={heatmapPercent.max}
          />
        </div>
      )}

      {heatmapAmount && !isToday && (
        <div>
          <h2
            style={{
              color: '#89E159',
              fontWeight: '400',
              marginBottom: '24px',
            }}
          >
            Распространенность болезней во всех регионах (кол-во)
          </h2>

          <HeatMap
            xAxis={heatmapAmount.dates}
            yAxis={heatmapAmount.illnesses}
            data1={heatmapAmount.data}
            data2={heatmapAmount.forecast}
            min={heatmapAmount.min}
            max={heatmapAmount.max}
          />
        </div>
      )}
    </div>
  );
};
