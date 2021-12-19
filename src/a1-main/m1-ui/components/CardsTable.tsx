import React from 'react';

import { Outlet } from 'react-router-dom';

import { SelectingSidebar } from './SelectingSidebar';

import s from 'styles/Cards.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const CardsTable = (): ReturnComponentType => (
  <div className={s.CardsWrapper}>
    <div className={s.CardsContainer}>
      <SelectingSidebar />
      <div className={s.CardsTableContainer}>
        <h1 className={s.titleCardsBlock}>Plaing Cards</h1>
        <Outlet />
      </div>
    </div>
  </div>
);
