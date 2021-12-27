import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { Loader } from './common/Loader';
import { Scroll } from './common/Scroll/Scroll';
import { Pagination } from './Pagination/Pagination';
import { UniversalTable } from './UniversalTable';

import { setCurrentCardPage, SortCardData } from 'a1-main/m2-bll/actions/cards-actions';
import { AppRootState } from 'a1-main/m2-bll/store';
import {
  addNewCard,
  deleteCard,
  getCards,
  updateCardData,
} from 'a1-main/m2-bll/thunks/cards-thunk';
import { cardsType } from 'a1-main/m3-dal/types/cardsType';
import { PORTION_SIZE } from 'constants/common';
import s from 'styles/Cards.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const CardsTable = (): ReturnComponentType => {
  const status = useSelector<AppRootState, boolean>(state => state.app.status);
  const cards = useSelector<AppRootState, cardsType[]>(state => state.cards.cards);
  const cardsTotalCount = useSelector<AppRootState, number>(
    state => state.cards.cardsTotalCount,
  );
  const page = useSelector<AppRootState, number>(state => state.cards.page);
  const pageCount = useSelector<AppRootState, number>(state => state.cards.pageCount);
  const sortCards = useSelector<AppRootState, string>(state => state.cards.sortCards);
  const dispatch = useDispatch();
  const location = useLocation();
  const packId = location.state;
  const cardsHeaders = {
    question: 'question',
    answer: 'answer',
    grade: 'grade',
    updated: 'updated',
  };
  const newCard = {
    cardsPack_id: packId,
    question: '[1,2,3] + 1 =?',
    answer: '1,2,31',
  };

  useEffect(() => {
    dispatch(getCards(packId));
  }, [sortCards]);
  const handleSortCards = (value: string): void => {
    dispatch(SortCardData(value));
  };

  const handleAddCard = (): void => {
    dispatch(addNewCard(newCard));
  };
  const handleDeleteCard = (cardId: string): void => {
    dispatch(deleteCard(cardId, packId));
  };
  const handleUpdateCard = (cardId: string, question: string): void => {
    dispatch(updateCardData(cardId, question, packId));
  };
  const onPageChanged = (pageNumber: number): void => {
    dispatch(setCurrentCardPage(pageNumber));
    dispatch(getCards(packId));
  };

  return (
    <div className={s.CardsContainer}>
      <div className={s.CardsBlock}>
        <h1 className={s.titleCardsBlock}>Playing Cards</h1>
        <Scroll />
        <div className={s.loader}>{status && <Loader />}</div>
        <UniversalTable
          items={cards}
          headers={cardsHeaders}
          deleteItem={handleDeleteCard}
          updateItem={handleUpdateCard}
          sortFunction={handleSortCards}
          addBlock={handleAddCard}
        />
        <Pagination
          totalItemsCount={cardsTotalCount} // это количество всех колод
          currentPage={page}
          onPageChanged={onPageChanged}
          pageSize={pageCount} // это количество колод на странице
          portionSize={PORTION_SIZE} // это количество страниц в блоке перемотки
        />
      </div>
    </div>
  );
};
