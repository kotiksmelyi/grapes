import { FC } from 'react';
import { YMaps } from '@pbe/react-yandex-maps';
import { MapI } from './Map';
import styles from './Map.module.css';

export const MapContainer: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.filter}></div>
      </div>
      <div className={styles.mapContainer}>
        <YMaps query={{ load: 'package.full' }}>
          <MapI />
        </YMaps>
      </div>
    </div>
  );
};
