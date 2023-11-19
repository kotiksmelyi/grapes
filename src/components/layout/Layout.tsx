import dayjs from 'dayjs';
import { FC, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import grapes from './assets/grape.svg';
import { useStore, useUnit } from 'effector-react';
import { dashboard } from '../../store/dataStore';
import { DropDown } from '../DropDown/DropDown';
import { Button, DatePicker, Spin } from 'antd';

interface Props {}

const formatTemplate = 'DD-MM-YYYY';

const setToday = () => {
  const today = dayjs().format(formatTemplate);
  dashboard.dateStore.setSelectedFilter('15-04-2021');
};

export const Layout: FC<Props> = ({}) => {
  const { $filters: dropdownOptions, $selectedFilter: selected } = useUnit(
    dashboard.regionsDropdownStore
  );
  const { $filters: ilnessOptions, $selectedFilter: selectedIlness } = useUnit(
    dashboard.illnessStore
  );
  const selectedDate = useStore(dashboard.dateStore.$selectedFilter);
  const regions = useStore(dashboard.$regions);

  const regionsLoading = useStore(dashboard.fetchRegionsFx.pending);
  const mapLoading = useStore(dashboard.fetchForcastMapFx.pending);
  const worstLoading = useStore(dashboard.fetchForcastWorstFx.pending);
  const loading = regionsLoading || mapLoading || worstLoading;
  useEffect(() => {
    setToday();
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
        <div className={styles.filters}>
          <DropDown
            placeholder='Регионы'
            options={dropdownOptions}
            value={selected}
            style={{ minWidth: 250 }}
            onChange={(value) =>
              dashboard.regionsDropdownStore.setSelectedFilter(value || null)
            }
            disabled={loading}
            allowClear
          />
          <DropDown
            style={{ minWidth: 250 }}
            onChange={(value) =>
              dashboard.illnessStore.setSelectedFilter(value || null)
            }
            placeholder='Заболевание'
            options={ilnessOptions}
            value={selectedIlness}
            allowClear
            disabled={loading}
          />
          <div>
            <DatePicker
              style={{ width: '100%' }}
              disabled={loading}
              value={dayjs(selectedDate, formatTemplate)}
              disabledDate={(date) => {
                return !(
                  date.diff('2021-04-15', 'day') > 0 &&
                  date.diff('2021-10-20', 'day') < 0
                );
              }}
              allowClear={false}
              format={formatTemplate}
              onChange={(_, date) =>
                dashboard.dateStore.setSelectedFilter(date)
              }
            />
          </div>
          <Button type='primary' onClick={setToday}>
            Выбрать сегодня
          </Button>
        </div>
      </div>
      {loading ? <Spin size='large' /> : <Outlet />}
    </div>
  );
};
