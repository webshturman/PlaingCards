import React from 'react';

import { RoutesContainer } from './RoutesContainer';

import s from 'styles/App.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const Main = (): ReturnComponentType => (
  <div className={s.loginBlock}>
    <h1 className={s.titleBlock}>Plaing Cards</h1>
    <RoutesContainer />
  </div>
);
