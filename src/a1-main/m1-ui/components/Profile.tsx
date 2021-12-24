import React from 'react';

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { PATH } from '../../../enums/routes';
import s from '../../../styles/Cards.module.css';

import { SelectingSidebar } from './SelectingSidebar';

import { AppRootState } from 'a1-main/m2-bll/store';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const Profile = (): ReturnComponentType => {
  const AuthUserStatus = useSelector<AppRootState, boolean>(state => state.auth.isAuth);

  if (!AuthUserStatus) return <Navigate to={PATH.LOGIN_FORM} />;

  return (
    <div className={s.CardsContainer}>
      <SelectingSidebar />
      <div className={s.CardsBlock}>
        <h1 className={s.titleCardsBlock}>My Packs list</h1>
        {/* <div className={s.loader}>{status && <Loader />}</div> */}
        {/* <UniversalTable */}
        {/*  items={cards} */}
        {/*  headers={cardsHeaders} */}
        {/*  deleteItem={handleDeleteCard} */}
        {/*  updateItem={handleUpdateCard} */}
        {/*  sortFunction={() => {}} */}
        {/*  addBlock={handleAddCard} */}
        {/* /> */}
        {/* <Pagination */}
        {/*  totalItemsCount={cardsTotalCount} // это количество всех колод */}
        {/*  currentPage={page} */}
        {/*  onPageChanged={onPageChanged} */}
        {/*  pageSize={pageCount} // это количество колод на странице */}
        {/*  portionSize={PORTION_SIZE} // это количество страниц в блоке перемотки */}
        {/* /> */}
      </div>
    </div>
  );
};
