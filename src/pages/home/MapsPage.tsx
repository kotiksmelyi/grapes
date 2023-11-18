import { FC, useRef, useState } from 'react';
import styles from './MapsPage.module.css';
import { MapContainer } from '../../components/Map/MapContainer';
import Button from '../../components/UI/Button/Button';
import { handleDownloadPdf } from '../../lib/utils/downloadPdf';
import { useStore } from 'effector-react';
import { dashboard } from '../../store/dataStore';
import { Layout } from '../../components/layout/Layout';

export const MapsPage: FC = () => {
  const downloadRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const download = async () => {
    setLoading(true);
    await handleDownloadPdf(downloadRef.current);

    setLoading(false);
  };

  const regionOptions = useStore(dashboard.regionStore.$filters);
  const region = useStore(dashboard.regionStore.$selectedFilter);

  const regionName = regionOptions.find((i) => i?.value === region);

  const featureOptions = useStore(dashboard.featureStore.$filters);
  const feature = useStore(dashboard.featureStore.$selectedFilter);

  const featureName = featureOptions.find((i) => i?.value === feature);

  return (
    <Layout>
      <div className={styles.container}>
        <div ref={downloadRef} style={{ padding: '0 30px 30px' }}>
          <MapContainer />
        </div>
      </div>
    </Layout>
  );
};
