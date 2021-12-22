import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { AppRootState } from '../../m2-bll/store';
import { cardsType } from '../../m3-dal/types/cardsType';

import { Button } from './common/CustomButton/Button';
import { Loader } from './common/Loader';
import { UniversalTable } from './UniversalTable';

import {
  addNewCard,
  deleteCard,
  getCards,
  updateCardData,
} from 'a1-main/m2-bll/thunks/cards-thunk';
import s from 'styles/Cards.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const CardsTable = (): ReturnComponentType => {
  const status = useSelector<AppRootState, boolean>(state => state.app.status);
  const cards = useSelector<AppRootState, cardsType[]>(state => state.cards.cards);
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
  const newCard = {
    cardsPack_id: packId,
    question: '[1,2,3] + 1 =?',
    answer: '1,2,31',
  };

  useEffect(() => {
    dispatch(getCards(packId));
  }, [packId]);

  const handleAddCard = (): void => {
    dispatch(addNewCard(newCard));
  };
  const handleDeleteCard = (cardId: string): void => {
    dispatch(deleteCard(cardId, packId));
  };
  const handleUpdateCard = (cardId: string, question: string): void => {
    // const updatedCard = {
    //   cardsPack_id: cardId,
    //   question: 'NaN == NaN',
    //   answer: 'false',
    // };
    dispatch(updateCardData(cardId, question, packId));
  };

  return (
    <div className={s.CardsBlock}>
      <h1 className={s.titleCardsBlock}>Plaing Cards</h1>
      <div className={s.loader}>{status && <Loader />}</div>
      <Button type="button" onClick={handleAddCard}>
        Add Card
      </Button>
      <UniversalTable
        items={cards}
        headers={cardsHeaders}
        deleteItem={handleDeleteCard}
        updateItem={handleUpdateCard}
      />
    </div>
  );
};
