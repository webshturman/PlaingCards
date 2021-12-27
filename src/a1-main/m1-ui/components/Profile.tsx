import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { PATH } from '../../../enums/routes';
import s from '../../../styles/Cards.module.css';

import { Loader } from './common/Loader';
import { Scroll } from './common/Scroll/Scroll';
import { Search } from './Search';
import { SelectingSidebar } from './SelectingSidebar';
import { UniversalTable } from './UniversalTable';

import { PacksType, setPackCardsTC } from 'a1-main/m2-bll/reducers/cardspack-reducer';
import { AppRootState } from 'a1-main/m2-bll/store';
import { searchPacks } from 'a1-main/m2-bll/thunks/search-thunk';
import { BUTTON_CARDS, FIRST_PAGE, packHeaders } from 'constants/common';
import style from 'styles/SelectingSidebar.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';
import { packUtils } from 'utils/packs-functions';

export const Profile = (): ReturnComponentType => {
  const AuthUserStatus = useSelector<AppRootState, boolean>(state => state.auth.isAuth);
  const status = useSelector<AppRootState, boolean>(state => state.app.status);
  const sortPack = useSelector<AppRootState, string>(state => state.cardspack.sortPacks);
  const pageCount = useSelector<AppRootState, number>(state => state.cardspack.pageCount);
  // @ts-ignore
  // eslint-disable-next-line no-underscore-dangle
  const userId = useSelector<AppRootState, string>(state => state.profile._id);
  const packCards = useSelector<AppRootState, Array<PacksType>>(
    state => state.cardspack.cardPacks,
  );
  const searchText = useSelector<AppRootState, string>(
    state => state.cardspack.searchText,
  );
  const [addPackCards, sortPackCards, deletePack, updatePack] = packUtils();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!searchText) {
      dispatch(setPackCardsTC(userId));
    } else {
      dispatch(searchPacks(searchText, sortPack, pageCount, FIRST_PAGE, userId));
    }
  }, [sortPack]);

  if (!AuthUserStatus) return <Navigate to={PATH.LOGIN_FORM} />;
  return (
    <div className={s.CardsContainer}>
      {/* @ts-ignore */}
      <SelectingSidebar>
        <div className={style.userAvatarContainer}>
          <div className={style.userAvatar} />
        </div>
        <div className={style.userName}>User name</div>
        <div className={style.userJobTitle}>User job title</div>
      </SelectingSidebar>
      <div className={s.CardsBlock}>
        <h1 className={s.titleCardsBlock}>My Packs list</h1>
        <Scroll />
        <div className={s.loader}>{status && <Loader />}</div>
        <Search userId={userId} />
        <UniversalTable
          items={packCards}
          headers={packHeaders}
          deleteItem={deletePack}
          updateItem={updatePack}
          sortFunction={sortPackCards}
          addBlock={addPackCards}
          extraButton={BUTTON_CARDS}
        />
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
