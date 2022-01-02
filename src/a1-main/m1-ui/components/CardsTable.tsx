import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { BackArrow } from './common/BackArrow/BackArrow';
import { Button } from './common/CustomButton/Button';
import { Loader } from './common/Loader';
import { CardDelete } from './common/Modal/CardDelete';
import { CardUpdate } from './common/Modal/CardUpdate';
import { Modal } from './common/Modal/Modal';
import { NewCard } from './common/Modal/NewCard';
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
import { EMPTY_STRING, PORTION_SIZE, ZERO_LENGTH } from 'constants/common';
import { PATH } from 'enums/routes';
import s from 'styles/Cards.module.css';
import st from 'styles/Search.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const CardsTable = (): ReturnComponentType => {
  const appStatus = useSelector<AppRootState, boolean>(state => state.app.status);
  const AuthUserStatus = useSelector<AppRootState, boolean>(state => state.auth.isAuth);
  // @ts-ignore
  const userId = useSelector<AppRootState, string>(state => state.profile._id);
  const cards = useSelector<AppRootState, cardsType[]>(state => state.cards.cards);
  const cardsTotalCount = useSelector<AppRootState, number>(
    state => state.cards.cardsTotalCount,
  );
  const page = useSelector<AppRootState, number>(state => state.cards.page);
  const pageCount = useSelector<AppRootState, number>(state => state.cards.pageCount);
  const sortCards = useSelector<AppRootState, string>(state => state.cards.sortCards);
  const dispatch = useDispatch();
  const location = useLocation();
  const { packId, packName, userIdOwnerThisPack } = location.state;
  const cardsHeaders = {
    question: 'question',
    answer: 'answer',
    grade: 'grade',
    updated: 'updated',
  };
  const [cardId, setCardId] = useState(EMPTY_STRING);
  const [createCardModal, setCreateCardModal] = useState(false);
  const [updateCardModal, setUpdateCardModal] = useState(false);
  const [deleteCardModal, setDeleteCardModal] = useState(false);

  const handleSortCards = (value: string): void => {
    dispatch(SortCardData(value));
  };
  const handleAddCard = (question: string, answer: string): void => {
    dispatch(addNewCard({ cardsPack_id: packId, question, answer }));
    setCreateCardModal(false);
  };
  const handleDeleteCard = (): void => {
    dispatch(deleteCard(cardId, packId));
    setDeleteCardModal(false);
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

  useEffect(() => {
    dispatch(getCards(packId));
  }, [sortCards]);

  if (!AuthUserStatus) return <Navigate to={PATH.LOGIN_FORM} />;

  return (
    <div className={s.CardsContainer}>
      <Scroll />
      <div
        className={cards.length === ZERO_LENGTH ? s.cardsBlockWithCards : s.cardsBlock}
      >
        <BackArrow />
        {!appStatus && (
          <div className={s.titleCardsBlock}>
            {cards.length === ZERO_LENGTH ? (
              <div className={s.title}>
                This card pack &quot;{packName}&quot; has no any card
                {userId === userIdOwnerThisPack ? (
                  <span>. You can add a card - click on the Add Card</span>
                ) : (
                  ''
                )}
              </div>
            ) : (
              <div>Card pack &quot;{packName}&quot;</div>
            )}
          </div>
        )}
        <div className={s.loader}>{appStatus && <Loader />}</div>
        <div className={st.searchAddBlock}>
          {userId === userIdOwnerThisPack ? (
            <Button type="button" onClick={() => setCreateCardModal(true)}>
              Add Card
            </Button>
          ) : (
            ''
          )}
        </div>
        {cards.length !== ZERO_LENGTH && (
          <div>
            <UniversalTable
              showDelete={setDeleteCardModal}
              showUpdate={setUpdateCardModal}
              items={cards}
              headers={cardsHeaders}
              sortFunction={handleSortCards}
              setId={setCardId}
              buttons={false}
            />
            <Pagination
              totalItemsCount={cardsTotalCount}
              currentPage={page}
              onPageChanged={onPageChanged}
              pageSize={pageCount}
              portionSize={PORTION_SIZE}
            />
          </div>
        )}
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
