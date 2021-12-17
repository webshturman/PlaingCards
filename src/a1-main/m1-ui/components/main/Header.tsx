import React from 'react';

import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { AppRootState } from '../../../m2-bll/store';

import { PATH } from 'enums/routes';
import style from 'styles/Header.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const Header = (): ReturnComponentType => {
  const AuthUserStatus = useSelector<AppRootState, boolean>(state => state.auth.isAuth);
  console.log(AuthUserStatus);
  return (
    <div className={style.header}>
      <div className={style.headerContainer}>
        <h1 className={style.title}>Plaing Cards</h1>
        <div className={style.itemMenu}>
          <NavLink
            to={PATH.PROFILE}
            className={({ isActive }) => (isActive ? style.active : '')}
          >
            Profile
          </NavLink>
        </div>
        <div className={style.itemMenu}>
          <NavLink
            to={PATH.CARDS}
            className={({ isActive }) => (isActive ? style.active : '')}
          >
            Packs List
          </NavLink>
        </div>
      </div>
    </div>
  );
};
