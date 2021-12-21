import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import s from '../../../styles/Cards.module.css';
import { ReturnComponentType } from '../../../types/ReturnComponentType';
import { setPackCardsTC } from '../../m2-bll/reducers/cardspack-reducer';
import { AppRootState } from '../../m2-bll/store';

import { Loader } from './common/Loader';
// import { UniversalTable } from './UniversalTable';

export const CardsTable = (): ReturnComponentType => {
  const status = useSelector<AppRootState, boolean>(state => state.app.status);
  // const packCards = useSelector<AppRootState, Array<PacksType>>(
  //   state => state.cardspack.cardPacks,
  // );
  const dispatch = useDispatch();
  // const packHeaders = { user_name: 'name', rating: 'rating', updated: 'updated' };

  useEffect(() => {
    dispatch(setPackCardsTC());
  }, []);

  return (
    <div className={s.CardsBlock}>
      <h1 className={s.titleCardsBlock}>Plaing Cards</h1>
      <div className={s.loader}>{status && <Loader />}</div>
      {/* <UniversalTable items={packCards} headers={packHeaders} /> */}
    </div>
  );
};
