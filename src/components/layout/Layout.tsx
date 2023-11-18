import { FC, ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Layout.module.css';
import grapes from './assets/grape.svg';
import { useStore, useUnit } from 'effector-react';
import { dashboard } from '../../store/dataStore';
import { DropDown } from '../DropDown/DropDown';

interface Props {
  children: ReactNode;
}

export const Layout: FC<Props> = ({ children }) => {
  const { $filters: dropdownOptions, $selectedFilter: selected } = useUnit(
    dashboard.regionsDropdownStore
  );
  const regions = useStore(dashboard.$regions);

  if (!regions) return null;

  return (
    <div className={styles.layout}>
      <img src={grapes} className={styles.image} />
      <div className={styles.container}>
        <NavLink
          to='/'
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
      <div>
        <h1 className={styles.header}>
          Аналитика по: {regions.find((i) => i.id === selected)?.name}
        </h1>
        <DropDown
          options={dropdownOptions}
          value={selected}
          onChange={dashboard.regionsDropdownStore.setSelectedFilter}
        />
      </div>
      {children}
    </div>
  );
};
