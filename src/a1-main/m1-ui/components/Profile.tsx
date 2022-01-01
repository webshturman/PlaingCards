import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { Button } from './common/CustomButton/Button';
import { Loader } from './common/Loader';
import { Modal } from './common/Modal/Modal';
import { NewPack } from './common/Modal/NewPack';
import { PackDelete } from './common/Modal/PackDelete';
import { PackUpdate } from './common/Modal/PackUpdate';
import { ProfileEdit } from './common/Modal/ProfileEdit';
import { Scroll } from './common/Scroll/Scroll';
import { Pagination } from './Pagination/Pagination';
import { Search } from './Search';
import { SelectingSidebar } from './SelectingSidebar';
import { UniversalTable } from './UniversalTable';

import {
  setCurrentPageAC,
  setMaxCardsCount,
  setMaxFilter,
  setMinCardsCount,
  setMinFilter,
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
import avatar from 'assets/images/avatar.jpg';
import {
  EMPTY_STRING,
  FIRST_PAGE,
  INITIAL_SORT_VALUE,
  packHeaders,
  PORTION_SIZE,
  ZERO,
} from 'constants/common';
import { PATH } from 'enums/routes';
import s from 'styles/Cards.module.css';
import st from 'styles/search.module.css';
import style from 'styles/SelectingSidebar.module.css';
import { Nullable } from 'types/Nullable';
import { ReturnComponentType } from 'types/ReturnComponentType';

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
  const photoAvatar = useSelector<AppRootState, Nullable<string>>(
    state => state.profile.avatar!,
  );

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
    if (!AuthUserStatus) {
      return;
    }
    if (!searchText) {
      dispatch(setPackCardsTC(userId));
    } else {
      dispatch(searchPacks(searchText, sortPack, pageCount, FIRST_PAGE, userId));
    }
  }, [sortPack]);
  useEffect(() => {
    dispatch(setSearchText(EMPTY_STRING));
    dispatch(setCurrentPageAC(FIRST_PAGE));
    dispatch(setMinCardsCount(ZERO));
    dispatch(setMaxCardsCount(ZERO));
    dispatch(setMinFilter(ZERO));
    dispatch(setMaxFilter(ZERO));
    dispatch(SortPackCardsAC(INITIAL_SORT_VALUE));
  }, []);
  const [editProfileModal, setEditProfileModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [packId, setPackId] = useState(EMPTY_STRING);

  const sortPackCards = (value: string): void => {
    dispatch(SortPackCardsAC(value));
  };
  const addPackCards = (title: string): void => {
    dispatch(createPackCardsTC(title, userId));
    setCreateModal(false);
  };
  const deletePack = (): void => {
    dispatch(deletePackCardsTC(packId, userId));
    setDeleteModal(false);
  };
  const updatePack = (title: string): void => {
    dispatch(updatePackCardsTC(packId, title, userId));
    setUpdateModal(false);
  };

  if (!AuthUserStatus) return <Navigate to={PATH.LOGIN_FORM} />;
  return (
    <div className={s.CardsContainer}>
      <SelectingSidebar>
        <div className={style.userAvatarContainer}>
          <img src={photoAvatar || avatar} alt="" />
          {/* <div className={style.userAvatar} /> */}
        </div>
        <div className={style.userName}>User name</div>
        <div className={style.userJobTitle}>User job title</div>
        <Button type="button" onClick={() => setEditProfileModal(true)}>
          edit profile
        </Button>
      </SelectingSidebar>
      <div className={s.cardsBlock}>
        <h1 className={s.titleCardsBlock}>My Packs list</h1>
        <Scroll />
        <div className={s.loader}>{status && <Loader />}</div>
        <div className={st.searchAddBlock}>
          <Search userId={userId} />
          <Button type="button" onClick={() => setCreateModal(true)}>
            Add Pack
          </Button>
        </div>
        <UniversalTable
          items={packCards}
          showDelete={setDeleteModal}
          showUpdate={setUpdateModal}
          headers={packHeaders}
          sortFunction={sortPackCards}
          setId={setPackId}
        />
        <Pagination
          totalItemsCount={cardPacksTotalCount} // это количество всех колод
          currentPage={page}
          onPageChanged={onPageChanged}
          pageSize={pageCount} // это количество колод на странице
          portionSize={PORTION_SIZE} // это количество страниц в блоке перемотки
        />
      </div>
      <Modal isOpen={editProfileModal}>
        <ProfileEdit showEdit={setEditProfileModal} />
      </Modal>
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
