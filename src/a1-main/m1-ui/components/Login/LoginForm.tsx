import React from 'react';

import { Outlet } from 'react-router-dom';

import { ReturnComponentType } from '../../../../types/ReturnComponentType';

import s from 'styles/App.module.css';

export const LoginForm = (): ReturnComponentType => (
  <div className={s.loginBlock}>
    <h1 className={s.titleBlock}>Plaing Cards</h1>
    <Outlet />
  </div>
);
