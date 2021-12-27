import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { Loader } from './common/Loader';
import { CardDelete } from './common/Modal/CardDelete';
import { CardUpdate } from './common/Modal/CardUpdate';
import { Modal } from './common/Modal/Modal';
import { NewCard } from './common/Modal/NewCard';
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
import { EMPTY_STRING, PORTION_SIZE } from 'constants/common';
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
  const [cardId, setCardId] = useState(EMPTY_STRING);
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
  const [createCardModal, setCreateCardModal] = useState(false);
  const [updateCardModal, setUpdateCardModal] = useState(false);
  const [deleteCardModal, setDeleteCardModal] = useState(false);

  const handleAddCard = (): void => {
    dispatch(addNewCard(newCard)); /// /&&&&&&&&&&&&&&&&&&&
    setCreateCardModal(false);
  };
  const handleDeleteCard = (): void => {
    dispatch(deleteCard(cardId, packId));
  };
  const handleUpdateCard = (question: string): void => {
    dispatch(updateCardData(cardId, question, packId));
    setUpdateCardModal(false);
  };
  const onPageChanged = (pageNumber: number): void => {
    dispatch(setCurrentCardPage(pageNumber));
    dispatch(getCards(packId));
    setDeleteCardModal(false);
  };

  return (
    <div className={s.CardsContainer}>
      <div className={s.CardsBlock}>
        <h1 className={s.titleCardsBlock}>Playing Cards</h1>
        <div className={s.loader}>{status && <Loader />}</div>
        <UniversalTable
          showCreate={setCreateCardModal}
          showDelete={setDeleteCardModal}
          showUpdate={setUpdateCardModal}
          items={cards}
          headers={cardsHeaders}
          // deleteItem={handleDeleteCard}
          // updateItem={handleUpdateCard}
          sortFunction={handleSortCards}
          // addBlock={handleAddCard}
          setId={setCardId}
        />
        <Pagination
          totalItemsCount={cardsTotalCount} // это количество всех колод
          currentPage={page}
          onPageChanged={onPageChanged}
          pageSize={pageCount} // это количество колод на странице
          portionSize={PORTION_SIZE} // это количество страниц в блоке перемотки
        />
      </div>
      <Modal isOpen={updateCardModal}>
        <CardUpdate showUpdate={setUpdateCardModal} handleUpdateCard={handleUpdateCard} />
      </Modal>
      <Modal isOpen={deleteCardModal}>
        <CardDelete showDelete={setDeleteCardModal} handleDeleteCard={handleDeleteCard} />
      </Modal>
      <Modal isOpen={createCardModal}>
        <NewCard showCreate={setCreateCardModal} handleAddCard={handleAddCard} />
      </Modal>
    </div>
  );
};
