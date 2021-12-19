import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';


import { getPackCards } from '../../m2-bll/reducers/cards-reducer';
import { AppRootState } from '../../m2-bll/store';

import { Loader } from './common/Loader';
import { UniversalTable } from './UniversalTable';
import { SelectingSidebar } from './SelectingSidebar';

import s from 'styles/Cards.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const CardsTable = (): ReturnComponentType => {
  const status = useSelector<AppRootState, boolean>(state => state.app.status);
  const packCards = useSelector<AppRootState, Array<any>>(state => state.cards.packCards);
  const dispatch = useDispatch();
  const packHeaders = { updated: 'updated', user_name: 'name', rating: 'rating' };

  useEffect(() => {
    dispatch(getPackCards());
  }, []);


    // <div className={s.CardsBlock}>

export const CardsTable = (): ReturnComponentType => (
  // <div className={s.CardsWrapper}>
    <div className={s.CardsContainer}>
      <SelectingSidebar />
      <div className={s.CardsTableContainer}>
        <h1 className={s.titleCardsBlock}>Plaing Cards</h1>
        <div className={s.loader}>{status && <Loader />}</div>
        <UniversalTable items={packCards} headers={packHeaders} />
      </div>
    </div>
  // </div>
);
