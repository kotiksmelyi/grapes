import { FC, useEffect } from 'react';
import { YMaps } from '@pbe/react-yandex-maps';
import { Map } from './Map';
import { DropDown } from '../DropDown/DropDown';
import styles from './Map.module.css';
import { useStore } from 'effector-react';
import { dashboard } from '../../store/dataStore';

export const MapContainer: FC = () => {
  const featureOptions = useStore(dashboard.featureStore.$filters);
  const regionsOptions = useStore(dashboard.regionStore.$filters);
  const feature = useStore(dashboard.featureStore.$selectedFilter);
  const region = useStore(dashboard.regionStore.$selectedFilter);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.filter}>
          {/* <DropDown
            options={regionsOptions}
            onChange={dashboard.regionStore.setSelectedFilter}
            defaultValue='Регион'
            value={region}
          />
          <DropDown
            options={featureOptions}
            onChange={dashboard.featureStore.setSelectedFilter}
            defaultValue='Признаки'
            value={feature}
          /> */}
        </div>
      </div>
      <div className={styles.mapContainer}>
        <YMaps query={{ load: 'package.full' }}>
          <Map />
        </YMaps>
      </div>
    </div>
  );
};
