import React from 'react';

import { Outlet } from 'react-router-dom';

import s from '../../../styles/Cards.module.css';
import { ReturnComponentType } from '../../../types/ReturnComponentType';

export const CardsTable = (): ReturnComponentType => (
  <div className={s.CardsBlock}>
    <h1 className={s.titleCardsBlock}>Plaing Cards</h1>
    <Outlet />
  </div>
);
