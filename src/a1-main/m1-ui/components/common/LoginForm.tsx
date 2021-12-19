import React from 'react';

import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import s from '../../../../styles/App.module.css';
import { ReturnComponentType } from '../../../../types/ReturnComponentType';
import { AppRootState } from '../../../m2-bll/store';

import { Loader } from './Loader';

export const LoginForm = (): ReturnComponentType => {
  const status = useSelector<AppRootState, boolean>(state => state.app.status);
  return (
    <div className={s.loginBlock}>
      <h1 className={s.titleBlock}>Plaing Cards</h1>
      <div className={s.loader}>{status && <Loader />}</div>
      <Outlet />
    </div>
  );
};
