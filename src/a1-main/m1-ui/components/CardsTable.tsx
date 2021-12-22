import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { AppRootState } from '../../m2-bll/store';
import { getCards } from '../../m2-bll/thunks/cards-thunk';
import { cardsType } from '../../m3-dal/types/cardsType';

import { Loader } from './common/Loader';
import { UniversalTable } from './UniversalTable';

import s from 'styles/Cards.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const CardsTable = (): ReturnComponentType => {
  const status = useSelector<AppRootState, boolean>(state => state.app.status);
  const cards = useSelector<AppRootState, cardsType[]>(state => state.cards);
  const dispatch = useDispatch();
  const location = useLocation();
  const packId = location.state;
  const cardsHeaders = {
    question: 'question',
    answer: 'answer',
    Grade: 'Grade',
    updated: 'updated',
    url: 'url',
  };

  useEffect(() => {
    dispatch(getCards(packId));
  }, []);

  return (
    <div className={s.cardsBlock}>
      <h1 className={s.titleCardsBlock}>Playing Cards</h1>
      <div className={s.loader}>{status && <Loader />}</div>
      <UniversalTable
        items={cards}
        updateItem={() => {}}
        deleteItem={() => {}}
        headers={cardsHeaders}
      />
    </div>
    // </div>
  );
};
