import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import st from '../../../styles/search.module.css';
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
import { AppRootState } from '../../m2-bll/store';
import {
  createPackCardsTC,
  deletePackCardsTC,
  setPackCardsTC,
  updatePackCardsTC,
} from '../../m2-bll/thunks/pack-thunk';
import { searchPacks } from '../../m2-bll/thunks/search-thunk';

import { Button } from './common/CustomButton/Button';
import { Loader } from './common/Loader';
import { Modal } from './common/Modal/Modal';
import { NewPack } from './common/Modal/NewPack';
import { PackDelete } from './common/Modal/PackDelete';
import { PackUpdate } from './common/Modal/PackUpdate';
import { Scroll } from './common/Scroll/Scroll';
import { Pagination } from './Pagination/Pagination';
import { Search } from './Search';
import { SelectingSidebar } from './SelectingSidebar';
import { UniversalTable } from './UniversalTable';

import { EMPTY_STRING, BUTTON_CARDS, FIRST_PAGE } from 'constants/common';
import s from 'styles/Cards.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const PacksCardsTable = (): ReturnComponentType => {
  const [allPacks, setAllPacks] = useState<boolean>(true);
  const status = useSelector<AppRootState, boolean>(state => state.app.status);
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
  const dispatch = useDispatch();

  const onPageChanged = (pageNumber: number): void => {
    dispatch(setCurrentPageAC(pageNumber));
    if (!searchText) {
      dispatch(setPackCardsTC(EMPTY_STRING));
    } else {
      dispatch(searchPacks(searchText, sortPack, pageCount, pageNumber));
    }
  };

  useEffect(() => {
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
    const zero = 0;
    dispatch(setSearchText(EMPTY_STRING));
    dispatch(setCurrentPageAC(FIRST_PAGE));
    dispatch(setMinCardsCount(zero));
    dispatch(setMaxCardsCount(zero));
    dispatch(setMinFilter(zero));
    dispatch(setMaxFilter(zero));
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
    dispatch(deletePackCardsTC(packId));
    setDeleteModal(false);
  };
  const updatePack = (title: string): void => {
    dispatch(updatePackCardsTC(packId, title));
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
  return (
    <div className={s.CardsContainer}>
      <Scroll />
      <SelectingSidebar>
        <h1>Show Cards Packs</h1>
        <div>
          <Button type="button" disabled={!allPacks} onClick={getMyPacks}>
            My
          </Button>
          <Button type="button" disabled={allPacks} onClick={getAllPacks}>
            All
          </Button>
        </div>
      </SelectingSidebar>
      <div className={s.cardsBlock}>
        <h1 className={s.titleCardsBlock}>Packs list</h1>
        <div className={s.loader}>{status && <Loader />}</div>
        <div className={st.searchAddBlock}>
          <Search userId={allPacks ? EMPTY_STRING : userId} />
          <Button type="button" onClick={() => addPackCards}>
            Add Pack
          </Button>
        </div>
        {/* {allPacks ? <Search userId={EMPTY_STRING} /> : <Search userId={userId} />} */}
        <UniversalTable
          items={packCards}
          headers={packHeaders}
          sortFunction={sortPackCards}
          extraButton={BUTTON_CARDS}
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
