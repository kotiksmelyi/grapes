import { FC } from 'react';
import styles from './MapsPage.module.css';
import { MapContainer } from '../../components/Map/MapContainer';
import { Layout } from '../../components/layout/Layout';

export const MapsPage: FC = () => {
  return (
    <div className={styles.container}>
      <div style={{ padding: '0 30px 30px' }}>
        <MapContainer />
      </div>
    </div>
  );
};
