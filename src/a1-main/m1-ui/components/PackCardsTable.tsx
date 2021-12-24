import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { EMPTY_STRING } from '../../../constants/common';
import s from '../../../styles/Cards.module.css';
import { ReturnComponentType } from '../../../types/ReturnComponentType';
import {
  createPackCardsTC,
  deletePackCardsTC,
  PacksType,
  setCurrentPageAC,
  setMaxCardsCount,
  setMaxFilter,
  setMinCardsCount,
  setMinFilter,
  setPackCardsTC,
  setSearchText,
  SortPackCardsAC,
  updatePackCardsTC,
} from '../../m2-bll/reducers/cardspack-reducer';
import { AppRootState } from '../../m2-bll/store';
import { searchPacks } from '../../m2-bll/thunks/search-thunk';

import { Loader } from './common/Loader';
import { Pagination } from './Pagination/Pagination';
import { Search } from './Search';
import { SelectingSidebar } from './SelectingSidebar';
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
  const searchText = useSelector<AppRootState, string>(
    state => state.cardspack.searchText,
  );
  const sortPacks = useSelector<AppRootState, string>(state => state.cardspack.sortPacks);
  const onPageChanged = (pageNumber: number): void => {
    dispatch(setCurrentPageAC(pageNumber));
    if (!searchText) {
      dispatch(setPackCardsTC());
    } else {
      dispatch(searchPacks(searchText, sortPacks, pageCount, pageNumber));
    }
  };

  useEffect(() => {
    dispatch(setPackCardsTC());
  }, [sortPack]);

  useEffect(
    () => () => {
      const zero = 0;
      const one = 1;
      dispatch(setSearchText(EMPTY_STRING));
      dispatch(setCurrentPageAC(one));
      dispatch(setMinCardsCount(zero));
      dispatch(setMaxCardsCount(zero));
      dispatch(setMinFilter(zero));
      dispatch(setMaxFilter(zero));
    },
    [],
  );

  const packHeaders = {
    user_name: 'writer',
    name: 'name',
    cardsCount: 'cards',
    updated: 'updated',
    rating: 'rating',
  };
  const addPackCards = (): void => {
    dispatch(createPackCardsTC('lakdlakfaldkad'));
  };
  const sortPackCards = (value: string): void => {
    dispatch(SortPackCardsAC(value));
  };
  const deletePack = (id: string): void => {
    dispatch(deletePackCardsTC(id));
  };
  const updatePack = (id: string, title: string): void => {
    dispatch(updatePackCardsTC(id, title));
  };

  return (
    <div className={s.CardsContainer}>
      <SelectingSidebar />
      <div className={s.CardsBlock}>
        <h1 className={s.titleCardsBlock}>Packs list</h1>
        <div className={s.loader}>{status && <Loader />}</div>
        <Search />
        <UniversalTable
          items={packCards}
          headers={packHeaders}
          deleteItem={deletePack}
          updateItem={updatePack}
          sortFunction={sortPackCards}
          addBlock={addPackCards}
        />
        <Pagination
          totalItemsCount={cardPacksTotalCount} // это количество всех колод
          currentPage={page}
          onPageChanged={onPageChanged}
          pageSize={pageCount} // это количество колод на странице
          portionSize={portionSize} // это количество страниц в блоке перемотки
        />
      </div>
    </div>
  );
};
