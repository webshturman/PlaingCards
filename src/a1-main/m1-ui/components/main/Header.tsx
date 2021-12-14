import React from 'react';

import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { getAuthUserData } from '../../../m2-bll/thunks/auth-thunk';

import { PATH } from 'enums/routes';
import style from 'styles/Header.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const Header = (): ReturnComponentType => {
  const dispatch = useDispatch();
  dispatch(getAuthUserData());

  // const setClassName = (isActive:boolean) => isActive ? style.active :''
  return (
    <div className={style.header}>
      <div className={style.headerContainer}>
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
            to={PATH.LOGIN}
            className={({ isActive }) => (isActive ? style.active : '')}
          >
            Login
          </NavLink>
        </div>

        <div className={style.itemMenu}>
          <NavLink
            to={PATH.REGISTER}
            className={({ isActive }) => (isActive ? style.active : '')}
          >
            Registration
          </NavLink>
        </div>

        <div className={style.itemMenu}>
          <NavLink
            to={PATH.RECOVERY_PASSWORD}
            className={({ isActive }) => (isActive ? style.active : '')}
          >
            Forgot Password
          </NavLink>
        </div>

        <div className={style.itemMenu}>
          <NavLink
            to={PATH.NEW_PASSWORD}
            className={({ isActive }) => (isActive ? style.active : '')}
          >
            New Password
          </NavLink>
        </div>
        <div className={style.itemMenu}>
          <NavLink
            to={PATH.TEST_PAGE}
            className={({ isActive }) => (isActive ? style.active : '')}
          >
            Test Page
          </NavLink>
        </div>
      </div>
    </div>
  );
};
