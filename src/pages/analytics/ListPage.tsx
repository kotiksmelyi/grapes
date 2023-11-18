import { FC, useRef, useState } from 'react';
import styles from './Analysis.module.css';
import { useStore } from 'effector-react';
import { dashboard } from '../../store/dataStore';
import { handleDownloadPdf } from '../../lib/utils/downloadPdf';
import { Layout } from '../../components/layout/Layout';

export const ListPage: FC = () => {
  const array = useStore(dashboard.$analysis);
  const options = useStore(dashboard.regionStore.$filters);
  const selected = useStore(dashboard.regionStore.$selectedFilter);

  const downloadRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const download = async () => {
    setLoading(true);
    await handleDownloadPdf(downloadRef.current);

    setLoading(false);
  };
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.drop}></div>
        <div ref={downloadRef} style={{ padding: 30 }}>
          <div className={styles.blocks}></div>
        </div>
      </div>
    </Layout>
  );
};
