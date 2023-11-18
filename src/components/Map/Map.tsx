import { Polygon, useYMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { useStore } from 'effector-react';
import { FC, useEffect, useRef, useState } from 'react';
import { http } from '../../lib/server/http';
import { dashboard } from '../../store/dataStore';

const getHint = (name: string, value: number) => {
  return `<div  style="font-size: 1.4em; padding: 3px">${name}: <span>${value}</span></div>`;
};

export const MapI: FC = () => {
  const regions = useStore(dashboard.$regions);
  const [diseases, setDiseases] = useState<any>();
  const getDiseases = async () => {
    const response = await http.get('/stats/forecast/map/25-05-2021');
    setDiseases(response.data);
  };

  useEffect(() => {
    getDiseases();
  }, []);
  // useEffect(() => {
  //
  //   if (!ymaps || !mapRef.current) {
  //     return;
  //   }

  //   const myMap = new ymaps.Map(mapRef.current, {
  //     center: [45.04484, 38.97603],
  //     zoom: 7,
  //   });
  //   setMap(myMap);
  //   // ymaps.borders
  //   //   .load('RU', {
  //   //     lang: 'ru',
  //   //     quality: 1,
  //   //   })
  //   //   .then(function (geojson) {
  //   //     setAllRegions(ymaps.geoQuery(geojson));
  //   //   });
  // }, [ymaps]);
  // // useEffect(() => {
  // //   if (map && allRegions && regions.length) {
  // //     regions.forEach((i) => {
  // //       allRegions
  // //         .search(`properties.iso3166 = "${i.region_code}"`)
  // //         .setOptions('fillColor', i.color + 'B2')
  // //         .setOptions('strokeColor', i.color)
  // //         .setOptions('strokeWidth', 2)
  // //         .setProperties('hintContent', getHint(i.region_name, i.value));
  // //     });
  // //     allRegions.addToMap(map);
  // //   }
  // // }, [map, regions]);

  return (
    <Map
      defaultState={{ center: [45.097572, 38.588104], zoom: 7 }}
      style={{ width: '100%', height: '500px' }}
    >
      {regions?.map((e) => (
        <Polygon
          key={e.id}
          geometry={e.coords}
          options={{
            fillColor: diseases?.find((i: any) => i?.region?.id === e.id).color,
            strokeColor: '#593c02',
            opacity: 0.5,
            strokeWidth: 2,
            strokeStyle: 'solid',
          }}
          properties={{
            balloonContent: diseases
              ?.find((i: any) => i?.region?.id === e.id)
              .illnesses.map((e: any) => e.name + ': ' + e.percent + '%'),
            hintContent: diseases
              ?.find((i: any) => i?.region?.id === e.id)
              .illnesses.map((e: any) => e.name + ': ' + e.percent + '%'),
          }}
        />
      ))}
    </Map>
  );
};
