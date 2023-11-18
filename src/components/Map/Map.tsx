import { Polygon, useYMaps, Map } from '@pbe/react-yandex-maps';
import { FC, useEffect, useRef, useState } from 'react';
import { http } from '../../lib/server/http';
import { IRegionsValue } from '../../store/map/mapStore';

const getHint = (name: string, value: number) => {
  return `<div  style="font-size: 1.4em; padding: 3px">${name}: <span>${value}</span></div>`;
};

export const MapI: FC = () => {

  // const regions = useStore(dashboard.mapStore.$regions);
  const [allRegions, setAllRegions] = useState<IRegionsValue[]>();

  const getRegions = async () => {
    const res = await http.get('/geography/regions');
    setAllRegions(res.data);
  };

  useEffect(() => {
    getRegions();
  }, []);

  // useEffect(() => {
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

  // // console.log(regions)

  console.log(allRegions?.at(0)?.coords);
  return (
    <Map
      defaultState={{ center: [45.097572, 38.588104], zoom: 15 }}
      style={{ width: '100%', height: '500px' }}
    >
      {allRegions?.map((e) => (
        <Polygon
          geometry={e.coords}
          options={{
            fillColor: '#ffa500',
            strokeColor: '#593c02',
            opacity: 0.5,
            strokeWidth: 2,
            strokeStyle: 'shortdash',
          }}
        />
      ))}
    </Map>
  );
};
