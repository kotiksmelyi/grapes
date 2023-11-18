import { useYMaps } from '@pbe/react-yandex-maps';
import { FC, useEffect, useRef, useState } from 'react';
import { useStore } from 'effector-react';
import { mapStore } from '../../store/map/mapStore';
import { dashboard } from '../../store/dataStore';
import styles from './Map.module.css';

const getHint = (name: string, value: number) => {
  return `<div  style="font-size: 1.4em; padding: 3px">${name}: <span>${value}</span></div>`;
};

export const Map: FC = () => {
  const ymaps = useYMaps(['Map']);
  const mapRef = useRef(null);

  const regions = useStore(dashboard.mapStore.$regions);
  const [allRegions, setAllRegions] = useState<any>();
  const [map, setMap] = useState<any>();

  useEffect(() => {
    if (!ymaps || !mapRef.current) {
      return;
    }

    const myMap = new ymaps.Map(mapRef.current, {
      center: [55.76, 37.64],
      zoom: 4,
    });
    setMap(myMap);
    ymaps.borders
      .load('RU', {
        lang: 'ru',
        quality: 1,
      })
      .then(function (geojson) {
        setAllRegions(ymaps.geoQuery(geojson));
      });
  }, [ymaps]);
  useEffect(() => {
    if (map && allRegions && regions.length) {
      regions.forEach((i) => {
        allRegions
          .search(`properties.iso3166 = "${i.region_code}"`)
          .setOptions('fillColor', i.color + 'B2')
          .setOptions('strokeColor', i.color)
          .setOptions('strokeWidth', 2)
          .setProperties('hintContent', getHint(i.region_name, i.value));
      });
      allRegions.addToMap(map);
    }
  }, [map, regions]);

  return <div ref={mapRef} style={{ height: 700 }} />;
};
