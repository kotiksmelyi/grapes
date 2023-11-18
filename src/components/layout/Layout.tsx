import { FC, ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Layout.module.css';
import grapes from './assets/grape.svg';
import { useStore } from 'effector-react';
import { dashboard } from '../../store/dataStore';

interface Props {
  children: ReactNode;
}

export const Layout: FC<Props> = ({ children }) => {
  const regionDropdown = useStore(dashboard.regionsDropdownStore.$filters);
  const regions = useStore(dashboard.$regions);
  console.log(regionDropdown);
  console.log(regions);

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
        <h1 className={styles.header}>Аналитика по городу: Новороссийск</h1>
      </div>
      {children}
    </div>
  );
};
