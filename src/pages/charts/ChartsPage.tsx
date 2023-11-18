import { FC } from 'react';
import { Layout } from '../../components/layout/Layout';
import { PieChartContainer } from '../../components/PieChartContainer/PieChartContainer';

export const ChartsPage: FC = () => {
  return (
    <div style={{ margin: '0 150px' }}>
      <PieChartContainer />
    </div>
  );
};
