import dayjs from 'dayjs';
import { FC, ReactNode, useEffect } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import grapes from './assets/grape.svg';
import { useStore, useUnit } from 'effector-react';
import { dashboard } from '../../store/dataStore';
import { DropDown } from '../DropDown/DropDown';
import { DatePicker } from 'antd';

interface Props {}

export const Layout: FC<Props> = ({}) => {
  const { $filters: dropdownOptions, $selectedFilter: selected } = useUnit(
    dashboard.regionsDropdownStore
  );
  const selectedDate = useStore(dashboard.dateStore.$selectedFilter);
  const regions = useStore(dashboard.$regions);

  useEffect(() => {
    dashboard.dateStore.setSelectedFilter('08-04-2021');
  }, []);

  if (!regions) return null;

  return (
    <div className={styles.layout}>
      <img src={grapes} className={styles.image} />
      <div className={styles.container}>
        <NavLink
          to='/map'
          className={({ isActive }) => `${isActive && styles.active}`}
        >
          Интерактивная карта
        </NavLink>
        <NavLink
          to='/list'
          className={({ isActive }) => `${isActive && styles.active}`}
        >
          Список заболеваний
        </NavLink>
        <NavLink
          to='/charts'
          className={({ isActive }) => `${isActive && styles.active}`}
        >
          Графики
        </NavLink>
        <NavLink
          to='/archive'
          className={({ isActive }) => `${isActive && styles.active}`}
        >
          Архив
        </NavLink>
      </div>
      <div className={styles.headerDropdown}>
        <h1 className={styles.header}>
          Аналитика по:{' '}
          {regions.find((i) => i.id === selected)?.name ||
            'Краснодарскому краю и Адыгее'}
        </h1>
        <div>
          <DropDown
            placeholder='Регионы'
            options={dropdownOptions}
            value={selected}
            onChange={(value) =>
              dashboard.regionsDropdownStore.setSelectedFilter(value || null)
            }
            onClear={console.log}
            allowClear
          />
          <DatePicker
            style={{ marginLeft: 30, marginTop: 20 }}
            value={dayjs(selectedDate)}
            disabledDate={(date) => {
              return !(
                date.diff('2021-04-07', 'day') > 0 &&
                date.diff('2021-10-31', 'day') < 0
              );
            }}
            allowClear={false}
            format={'DD-MM-YYYY'}
            onChange={(_, date) => dashboard.dateStore.setSelectedFilter(date)}
          />
        </div>
      </div>
      <Outlet />
    </div>
  );
};
