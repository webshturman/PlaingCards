import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import {
  setCurrentPageAC,
  setMaxCardsCount,
  setMaxFilter,
  setMinCardsCount,
  setMinFilter,
  setSearchText,
  SortPackCardsAC,
} from '../../m2-bll/actions/pack-action';
import { PacksType } from '../../m2-bll/reducers/cardspack-reducer';
import { setPackCardsTC } from '../../m2-bll/thunks/pack-thunk';

import { Button } from './common/CustomButton/Button';
import { Loader } from './common/Loader';
import { Scroll } from './common/Scroll/Scroll';
import { Pagination } from './Pagination/Pagination';
import { Search } from './Search';
import { SelectingSidebar } from './SelectingSidebar';
import { UniversalTable } from './UniversalTable';

import { AppRootState } from 'a1-main/m2-bll/store';
import { searchPacks } from 'a1-main/m2-bll/thunks/search-thunk';
import {
  EMPTY_STRING,
  FIRST_PAGE,
  INITIAL_SORT_VALUE,
  packHeaders,
  PORTION_SIZE,
} from 'constants/common';
import { PATH } from 'enums/routes';
import s from 'styles/Cards.module.css';
import st from 'styles/search.module.css';
import style from 'styles/SelectingSidebar.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';
import { packUtils } from 'utils/packs-functions';

export const Profile = (): ReturnComponentType => {
  const AuthUserStatus = useSelector<AppRootState, boolean>(state => state.auth.isAuth);
  const status = useSelector<AppRootState, boolean>(state => state.app.status);
  const sortPack = useSelector<AppRootState, string>(state => state.cardspack.sortPacks);
  const pageCount = useSelector<AppRootState, number>(state => state.cardspack.pageCount);
  const page = useSelector<AppRootState, number>(state => state.cardspack.page);
  const cardPacksTotalCount = useSelector<AppRootState, number>(
    state => state.cardspack.cardPacksTotalCount,
  );
  // @ts-ignore
  const userId = useSelector<AppRootState, string>(state => state.profile._id);
  const packCards = useSelector<AppRootState, Array<PacksType>>(
    state => state.cardspack.cardPacks,
  );
  const searchText = useSelector<AppRootState, string>(
    state => state.cardspack.searchText,
  );
  const [addPackCards, sortPackCards] = packUtils();
  const dispatch = useDispatch();
  const onPageChanged = (pageNumber: number): void => {
    dispatch(setCurrentPageAC(pageNumber));
    if (!searchText) {
      dispatch(setPackCardsTC(userId));
    } else {
      dispatch(searchPacks(searchText, sortPack, pageCount, pageNumber, userId));
    }
  };

  useEffect(() => {
    if (!searchText) {
      dispatch(setPackCardsTC(userId));
    } else {
      dispatch(searchPacks(searchText, sortPack, pageCount, FIRST_PAGE, userId));
    }
  }, [sortPack]);
  useEffect(() => {
    const zero = 0;
    dispatch(setSearchText(EMPTY_STRING));
    dispatch(setCurrentPageAC(FIRST_PAGE));
    dispatch(setMinCardsCount(zero));
    dispatch(setMaxCardsCount(zero));
    dispatch(setMinFilter(zero));
    dispatch(setMaxFilter(zero));
    dispatch(SortPackCardsAC(INITIAL_SORT_VALUE));
  }, []);

  if (!AuthUserStatus) return <Navigate to={PATH.LOGIN_FORM} />;
  return (
    <div className={s.CardsContainer}>
      <SelectingSidebar>
        <div className={style.userAvatarContainer}>
          <div className={style.userAvatar} />
        </div>
        <div className={style.userName}>User name</div>
        <div className={style.userJobTitle}>User job title</div>
      </SelectingSidebar>
      <div className={s.cardsBlock}>
        <h1 className={s.titleCardsBlock}>My Packs list</h1>
        <Scroll />
        <div className={s.loader}>{status && <Loader />}</div>
        <div className={st.searchAddBlock}>
          <Search userId={userId} />
          <Button type="button" onClick={() => addPackCards(userId)}>
            Add Pack
          </Button>
        </div>
        <UniversalTable
          items={packCards}
          showDelete={() => {}}
          showUpdate={() => {}}
          headers={packHeaders}
          sortFunction={sortPackCards}
          setId={() => {}}
        />
        <Pagination
          totalItemsCount={cardPacksTotalCount} // это количество всех колод
          currentPage={page}
          onPageChanged={onPageChanged}
          pageSize={pageCount} // это количество колод на странице
          portionSize={PORTION_SIZE} // это количество страниц в блоке перемотки
        />
      </div>
    </div>
  );
};
