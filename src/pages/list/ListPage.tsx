import { Spin } from 'antd';
import { useStore } from 'effector-react';
import { dashboard } from '../../store/dataStore';
import styles from './list-page.module.css';

export const ListPage = () => {
  const list = useStore(dashboard.forcastWorst);
  const loading = useStore(dashboard.fetchForcastWorstFx.pending);
  if (loading) return <Spin size='large' />;

  if (!list.length)
    return <div className={styles.container}>Выберите дату</div>;
  return (
    <div className={styles.container}>
      <h2 className={styles.h4}>
        Заболевания с повышенным риском в течение 4 дней:
      </h2>
      {list.map((i, key) => {
        return (
          <div key={key}>
            <div className={styles.regionName}>{i.region.name}</div>
            <div>
              {i.illnesses.map((illndess) => (
                <div className={styles.illnessContainer}>
                  <div>{illndess.name}</div>
                  <div className={styles.illnessCards}>
                    <div className={styles.chance}>
                      Шанс {illndess.percent}%
                    </div>
                    <div className={styles.chance}>
                      Шанс {illndess.percent}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
