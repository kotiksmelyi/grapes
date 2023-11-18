import { Spin } from 'antd';
import { useStore } from 'effector-react';
import { dashboard } from '../../store/dataStore';
import styles from './list-page.module.css';
import temp from '../../assets/assets/temp.svg';
import water from '../../assets/assets/water.svg';
import cloud from '../../assets/assets/cloud.svg';

export const ListPage = () => {
  const list = useStore(dashboard.forcastWorst);
  const loading = useStore(dashboard.fetchForcastWorstFx.pending);
  if (loading) return <Spin size='large' />;

  if (!list.length)
    return <div className={styles.container}>Выберите дату</div>;
  return (
    <div className={styles.container}>
      <h2 className={styles.h4}>
        Заболевания с повышенным риском в течение 3 дней:
      </h2>
      {list.map((i, key) => {
        console.log(list)
        return (
          <div key={key}>
            <div className={styles.regionName}>{i.region.name}</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {i.illnesses.map((illndess) => (
                <div className={styles.illnessContainer}>
                  <div
                    style={{
                      margin: '20px 0',
                      color: '#ff4d4d',
                      fontWeight: '600',
                    }}
                  >
                    {illndess.name}
                  </div>
                  <div className={styles.illnessCards}>
                    <div className={styles.chance}>
                      Шанс {illndess.percent}%
                    </div>
                    <div className={styles.card}>
                      <img src={temp} width={30} height={30} />
                      <div className={styles.textContainer}>
                        <p>
                          Температура воздуха сегодня:
                          <span>
                            {' +' +
                              Object.values(i?.weather_forecast)?.at(0)?.T}
                          </span>
                        </p>
                        <p>
                          Ожидаемая температура воздуха завтра:
                          <span>
                            {' +' +
                              Object.values(i?.weather_forecast)?.at(1)?.T}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className={styles.card}>
                      <img src={water} width={30} height={30} />
                      <div className={styles.textContainer}>
                        <p>
                          Относительная влажность сегодня:
                          <span>
                            {' ' + Object.values(i?.weather_forecast)?.at(0)?.U}
                          </span>
                        </p>
                        <p>
                          Ожидаемая относительная влажность завтра:
                          <span>
                            {' ' + Object.values(i?.weather_forecast)?.at(1)?.U}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className={styles.card}>
                      <img src={cloud} width={30} height={30} />
                      <div className={styles.textContainer}>
                        <p>
                          Сегодня:
                          <span>
                            {' ' +
                              Object.values(i?.weather_forecast)?.at(0)?.WW}
                          </span>
                        </p>
                        <p>
                          Завтра:
                          <span>
                            {' ' +
                              Object.values(i?.weather_forecast)?.at(1)?.WW}
                          </span>
                        </p>
                      </div>
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
