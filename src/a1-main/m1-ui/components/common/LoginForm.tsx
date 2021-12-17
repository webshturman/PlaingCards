import React from 'react';

import { Outlet } from 'react-router-dom';

import s from '../../../../styles/App.module.css';
import { ReturnComponentType } from '../../../../types/ReturnComponentType';

export const LoginForm = (): ReturnComponentType => (
  <div className={s.loginBlock}>
    <h1 className={s.titleBlock}>Plaing Cards</h1>
    <Outlet />
  </div>
);
