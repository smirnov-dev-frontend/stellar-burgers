import React, { FC } from 'react';
import { NavLink, useMatch } from 'react-router-dom';

import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const isConstructorActive = Boolean(useMatch('/'));
  const isFeedActive = Boolean(useMatch('/feed/*'));
  const isProfileActive = Boolean(useMatch('/profile/*'));

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <NavLink to='/' end className={styles.link}>
            <BurgerIcon type={isConstructorActive ? 'primary' : 'secondary'} />
            <p
              className={`text text_type_main-default ml-2 mr-10 ${
                isConstructorActive
                  ? 'text_color_primary'
                  : 'text_color_inactive'
              }`}
            >
              Конструктор
            </p>
          </NavLink>

          <NavLink to='/feed' className={styles.link}>
            <ListIcon type={isFeedActive ? 'primary' : 'secondary'} />
            <p
              className={`text text_type_main-default ml-2 ${
                isFeedActive ? 'text_color_primary' : 'text_color_inactive'
              }`}
            >
              Лента заказов
            </p>
          </NavLink>
        </div>

        <NavLink to='/' className={styles.logo}>
          <Logo className='' />
        </NavLink>

        <NavLink
          to='/profile'
          className={`${styles.link} ${styles.link_position_last}`}
        >
          <ProfileIcon type={isProfileActive ? 'primary' : 'secondary'} />
          <p
            className={`text text_type_main-default ml-2 ${
              isProfileActive ? 'text_color_primary' : 'text_color_inactive'
            }`}
          >
            {userName || 'Личный кабинет'}
          </p>
        </NavLink>
      </nav>
    </header>
  );
};
