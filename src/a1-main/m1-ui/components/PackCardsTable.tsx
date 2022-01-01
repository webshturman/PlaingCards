import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { Button } from './common/CustomButton/Button';
import { Loader } from './common/Loader';
import { Modal } from './common/Modal/Modal';
import { NewPack } from './common/Modal/NewPack';
import { PackDelete } from './common/Modal/PackDelete';
import { PackUpdate } from './common/Modal/PackUpdate';
import { Scroll } from './common/Scroll/Scroll';
import { Pagination } from './Pagination/Pagination';
import { Search } from './Search';
import { Sidebar } from './Sidebar';
import { UniversalTable } from './UniversalTable';

import {
  setCurrentPageAC,
  setMaxCardsCount,
  setMinCardsCount,
  setSearchText,
  SortPackCardsAC,
} from 'a1-main/m2-bll/actions/pack-action';
import { PacksType } from 'a1-main/m2-bll/reducers/cardspack-reducer';
import { AppRootState } from 'a1-main/m2-bll/store';
import {
  createPackCardsTC,
  deletePackCardsTC,
  setPackCardsTC,
  updatePackCardsTC,
} from 'a1-main/m2-bll/thunks/pack-thunk';
import { searchPacks } from 'a1-main/m2-bll/thunks/search-thunk';
import { EMPTY_STRING, FIRST_PAGE, ZERO } from 'constants/common';
import { PATH } from 'enums/routes';
import s from 'styles/Cards.module.css';
import st from 'styles/Search.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const PacksCardsTable = (): ReturnComponentType => {
  const dispatch = useDispatch();
  const [allPacks, setAllPacks] = useState<boolean>(true);
  const status = useSelector<AppRootState, boolean>(state => state.app.status);
  const AuthUserStatus = useSelector<AppRootState, boolean>(state => state.auth.isAuth);
  // @ts-ignore
  const userId = useSelector<AppRootState, string>(state => state.profile._id);
  const packCards = useSelector<AppRootState, Array<PacksType>>(
    state => state.cardspack.cardPacks,
  );
  const sortPack = useSelector<AppRootState, string>(state => state.cardspack.sortPacks);
  const cardPacksTotalCount = useSelector<AppRootState, number>(
    state => state.cardspack.cardPacksTotalCount,
  );
  const initialSortValue = '0updated';
  const page = useSelector<AppRootState, number>(state => state.cardspack.page);
  const pageCount = useSelector<AppRootState, number>(state => state.cardspack.pageCount);
  const portionSize = useSelector<AppRootState, number>(
    state => state.cardspack.portionSize,
  );
  const searchText = useSelector<AppRootState, string>(
    state => state.cardspack.searchText,
  );

  const onPageChanged = (pageNumber: number): void => {
    dispatch(setCurrentPageAC(pageNumber));
    if (!searchText) {
      dispatch(setPackCardsTC(EMPTY_STRING));
    } else {
      dispatch(searchPacks(searchText, sortPack, pageCount, pageNumber));
    }
  };

  useEffect(() => {
    if (!AuthUserStatus) {
      return;
    }
    if (!searchText) {
      if (allPacks) {
        dispatch(setPackCardsTC(EMPTY_STRING));
      } else {
        dispatch(setPackCardsTC(userId));
      }
    } else {
      dispatch(searchPacks(searchText, sortPack, pageCount, FIRST_PAGE));
    }
  }, [sortPack]);

  useEffect(() => {
    dispatch(setSearchText(EMPTY_STRING));
    dispatch(setCurrentPageAC(FIRST_PAGE));
    dispatch(setMinCardsCount(ZERO));
    dispatch(setMaxCardsCount(ZERO));
    dispatch(SortPackCardsAC(initialSortValue));
  }, []);

  const [createModal, setCreateModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [packId, setPackId] = useState(EMPTY_STRING);
  const packHeaders = {
    user_name: 'writer',
    name: 'name',
    cardsCount: 'cards',
    updated: 'updated',
    rating: 'rating',
  };
  const addPackCards = (title: string): void => {
    dispatch(createPackCardsTC(title, userId));
    setCreateModal(false);
    setAllPacks(false);
  };
  const sortPackCards = (value: string): void => {
    dispatch(SortPackCardsAC(value));
  };
  const deletePack = (): void => {
    dispatch(deletePackCardsTC(packId, userId));
    setDeleteModal(false);
  };
  const updatePack = (title: string): void => {
    dispatch(updatePackCardsTC(packId, title, userId));
    setUpdateModal(false);
  };
  const getAllPacks = (): void => {
    dispatch(setPackCardsTC(EMPTY_STRING));
    setAllPacks(true);
  };
  const getMyPacks = (): void => {
    dispatch(setPackCardsTC(userId));
    setAllPacks(false);
  };

  if (!AuthUserStatus) return <Navigate to={PATH.LOGIN_FORM} />;

  return (
    <div className={s.CardsContainer}>
      <Scroll />
      <Sidebar>
        <h1>Show Cards Packs</h1>
        <div className={s.selectPacksButtonsContainer}>
          <div
            className={
              !allPacks ? s.selectPacksButtonActive : s.selectPacksButtonUnActive
            }
          >
            <Button
              type="button"
              disabled={!allPacks}
              onClick={getMyPacks}
              className={s.selectPacksButton}
            >
              My
            </Button>
          </div>
          <div
            className={allPacks ? s.selectPacksButtonActive : s.selectPacksButtonUnActive}
          >
            <Button
              type="button"
              disabled={allPacks}
              onClick={getAllPacks}
              className={s.selectPacksButton}
            >
              All
            </Button>
          </div>
        </div>
      </Sidebar>
      <div className={s.cardsBlock}>
        <h1 className={s.titleCardsBlock}>Packs list</h1>
        <div className={s.loader}>{status && <Loader />}</div>
        <div className={st.searchAddBlock}>
          <Search userId={allPacks ? EMPTY_STRING : userId} />
          <Button type="button" onClick={() => setCreateModal(true)}>
            Add Pack
          </Button>
        </div>
        {/* {allPacks ? <Search userId={EMPTY_STRING} /> : <Search userId={userId} />} */}
        <UniversalTable
          items={packCards}
          headers={packHeaders}
          sortFunction={sortPackCards}
          showDelete={setDeleteModal}
          showUpdate={setUpdateModal}
          setId={setPackId}
        />
        <Pagination
          totalItemsCount={cardPacksTotalCount}
          currentPage={page}
          onPageChanged={onPageChanged}
          pageSize={pageCount}
          portionSize={portionSize}
        />
      </div>
      <Modal isOpen={updateModal}>
        <PackUpdate showUpdate={setUpdateModal} updatePack={updatePack} />
      </Modal>
      <Modal isOpen={deleteModal}>
        <PackDelete showDelete={setDeleteModal} deletePack={deletePack} />
      </Modal>
      <Modal isOpen={createModal}>
        <NewPack showCreate={setCreateModal} addPack={addPackCards} />
      </Modal>
    </div>
  );
};
