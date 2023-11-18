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

  const diseases = useStore(dashboard.forcastMap);

  if (!diseases.length) return null;

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
            fillColor: diseases?.find((i: any) => i?.region?.id === e.id)
              ?.color,
            strokeColor: '#593c02',
            opacity: 0.5,
            strokeWidth: 2,
            strokeStyle: 'solid',
          }}
          properties={{
            balloonContent: diseases
              ?.find((i: any) => i?.region?.id === e.id)
              ?.illnesses.map((e: any) => e.name + ': ' + e.percent + '%'),
            hintContent: diseases
              ?.find((i: any) => i?.region?.id === e.id)
              ?.illnesses.map((e: any) => e.name + ': ' + e.percent + '%'),
          }}
        />
      ))}
    </Map>
  );
};
