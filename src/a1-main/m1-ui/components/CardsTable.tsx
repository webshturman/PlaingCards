import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { AppRootState } from '../../m2-bll/store';
import { getCards } from '../../m2-bll/thunks/cards-thunk';
import { cardsType } from '../../m3-dal/types/cardsType';

import { Loader } from './common/Loader';
import { SelectingSidebar } from './SelectingSidebar';
import { UniversalTable } from './UniversalTable';

import s from 'styles/Cards.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const CardsTable = (): ReturnComponentType => {
  const status = useSelector<AppRootState, boolean>(state => state.app.status);
  const cards = useSelector<AppRootState, cardsType[]>(state => state.cards);
  const dispatch = useDispatch();
  const cardsHeaders = { updated: 'updated', user_name: 'name', rating: 'rating' };

  useEffect(() => {
    dispatch(getCards('5f2be6cd9cf95e0004fe8960'));
  }, []);

  return (
    <div className={s.CardsWrapper}>
      <div className={s.CardsContainer}>
        <SelectingSidebar />
        <div className={s.CardsTableContainer}>
          <h1 className={s.titleCardsBlock}>Plaing Cards</h1>
          <div className={s.loader}>{status && <Loader />}</div>
          <UniversalTable items={cards} headers={cardsHeaders} />
        </div>
      </div>
    </div>
  );
};
// <div className={s.CardsBlock}>CardsTableContainer
