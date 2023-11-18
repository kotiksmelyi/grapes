import { FC } from 'react';
import styles from './MapsPage.module.css';
import { MapContainer } from '../../components/Map/MapContainer';
import { useStore } from 'effector-react';
import { dashboard } from '../../store/dataStore';
import temp from '../../assets/assets/temp.svg';
import water from '../../assets/assets/water.svg';
import cloud from '../../assets/assets/cloud.svg';

export const MapsPage: FC = () => {
  const diseases = useStore(dashboard.forcastWorst);

  return (
    <div className={styles.container}>
      <div style={{ padding: '0 30px 30px' }}>
        <MapContainer />
      </div>

      {diseases.length <= 1 &&
        diseases?.map((e) => (
          <div className={styles.cardContainer}>
            {e.weather_forecast && (
              <>
                <div className={styles.card}>
                  <img src={temp} width={30} height={30} />
                  <div className={styles.textContainer}>
                    <p>
                      Температура воздуха сегодня:
                      <span>
                        {' +' + Object.values(e?.weather_forecast)?.at(0)?.T}
                      </span>
                    </p>
                    <p>
                      Ожидаемая температура воздуха завтра:
                      <span>
                        {' +' + Object.values(e?.weather_forecast)?.at(1)?.T}
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
                        {' ' + Object.values(e?.weather_forecast)?.at(0)?.U}
                      </span>
                    </p>
                    <p>
                      Ожидаемая относительная влажность завтра:
                      <span>
                        {' ' + Object.values(e?.weather_forecast)?.at(1)?.U}
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
                        {' ' + Object.values(e?.weather_forecast)?.at(0)?.WW}
                      </span>
                    </p>
                    <p>
                      Завтра:
                      <span>
                        {' ' + Object.values(e?.weather_forecast)?.at(1)?.WW}
                      </span>
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
    </div>
  );
};
