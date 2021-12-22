import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import s from '../../../styles/Cards.module.css';
import { ReturnComponentType } from '../../../types/ReturnComponentType';
import {
  createPackCardsTC,
  deletePackCardsTC,
  getCardPacks,
  PacksType,
  setCurrentPageAC,
  setPackCardsTC,
  updatePackCardsTC,
} from '../../m2-bll/reducers/cardspack-reducer';
import { AppRootState } from '../../m2-bll/store';

import { Loader } from './common/Loader';
import { Pagination } from './Pagination/Pagination';
import { UniversalTable } from './UniversalTable';

export const PacksCardsTable = (): ReturnComponentType => {
  const status = useSelector<AppRootState, boolean>(state => state.app.status);
  const packCards = useSelector<AppRootState, Array<PacksType>>(
    state => state.cardspack.cardPacks,
  );
  const sortPack = useSelector<AppRootState, string>(state => state.cardspack.sortPacks);
  const dispatch = useDispatch();

  const cardPacksTotalCount = useSelector<AppRootState, number>(
    state => state.cardspack.cardPacksTotalCount,
  );
  const page = useSelector<AppRootState, number>(state => state.cardspack.page);
  const pageCount = useSelector<AppRootState, number>(state => state.cardspack.pageCount);
  const portionSize = useSelector<AppRootState, number>(
    state => state.cardspack.portionSize,
  );
  const onPageChanged = (pageNumber: number): void => {
    dispatch(setCurrentPageAC(pageNumber));
    dispatch(getCardPacks(pageNumber));
  };

  useEffect(() => {
    dispatch(setPackCardsTC());
  }, [sortPack]);

  const packHeaders = {
    user_name: 'write',
    name: 'name',
    cardsCount: 'cards',
    updated: 'updated',
    rating: 'rating',
  };
  const addPackCards = (): void => {
    dispatch(createPackCardsTC('lakdlakfaldkad'));
  };
  const sortPackCards = (): void => {
    dispatch(setPackCardsTC());
  };
  const deletePack = (id: string): void => {
    dispatch(deletePackCardsTC(id));
  };
  const updatePack = (id: string, title: string): void => {
    dispatch(updatePackCardsTC(id, title));
  };

  return (
    <div className={s.CardsBlock}>
      <h1 className={s.titleCardsBlock}>Playing Cards</h1>
      <div className={s.loader}>{status && <Loader />}</div>
      <button type="button" onClick={addPackCards}>
        AAAAAAA DDDD PACKKKKKKK
      </button>
      <button type="button" onClick={sortPackCards}>
        Sortttttttttttttttttttt
      </button>
      <UniversalTable
        items={packCards}
        headers={packHeaders}
        deleteItem={deletePack}
        updateItem={updatePack}
      />
      <Pagination
        totalItemsCount={cardPacksTotalCount} // это количество всех колод
        currentPage={page}
        onPageChanged={onPageChanged}
        pageSize={pageCount} // это количество колод на странице
        portionSize={portionSize} // это количество страниц в блоке перемотки
      />
    </div>
  );
};
