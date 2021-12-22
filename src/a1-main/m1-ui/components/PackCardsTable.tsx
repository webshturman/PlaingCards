import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import s from '../../../styles/Cards.module.css';
import { ReturnComponentType } from '../../../types/ReturnComponentType';
import {
  createPackCardsTC,
  deletePackCardsTC,
  PacksType,
  setPackCardsTC,
  SortPackCardsAC,
  updatePackCardsTC,
} from '../../m2-bll/reducers/cardspack-reducer';
import { AppRootState } from '../../m2-bll/store';

import { Loader } from './common/Loader';
import { UniversalTable } from './UniversalTable';

export const PacksCardsTable = (): ReturnComponentType => {
  const status = useSelector<AppRootState, boolean>(state => state.app.status);
  const packCards = useSelector<AppRootState, Array<PacksType>>(
    state => state.cardspack.cardPacks,
  );
  const sortPack = useSelector<AppRootState, string>(state => state.cardspack.sortPacks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPackCardsTC());
  }, [sortPack]);

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
      <div className={s.CardsBlock}>
        <h1 className={s.titleCardsBlock}>Plaing Cards</h1>
        <div className={s.loader}>{status && <Loader />}</div>
        <UniversalTable
          items={packCards}
          headers={packHeaders}
          deleteItem={deletePack}
          updateItem={updatePack}
          sortFunction={sortPackCards}
          addBlock={addPackCards}
        />
      </div>
    </div>
  );
};
