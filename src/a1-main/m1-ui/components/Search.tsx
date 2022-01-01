import React, { FC, FormEvent, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Button } from './common/CustomButton/Button';
import { Input } from './common/CustomInput/Input';

import { AppRootState } from 'a1-main/m2-bll/store';
import { searchPacks } from 'a1-main/m2-bll/thunks/search-thunk';
import { SearchType } from 'a1-main/m3-dal/types/searchType';
import { EMPTY_STRING, SEARCH } from 'constants/common';
import s from 'styles/Search.module.css';

export const Search: FC<SearchType> = ({ userId }): React.ReactElement => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState<string>(EMPTY_STRING);
  const isFetching = useSelector<AppRootState, boolean>(state => state.app.isFetching);
  const sortPacks = useSelector<AppRootState, string>(state => state.cardspack.sortPacks);
  const pageCount = useSelector<AppRootState, number>(state => state.cardspack.pageCount);
  const page = useSelector<AppRootState, number>(state => state.cardspack.page);
  const minFilter = useSelector<AppRootState, number>(state => state.cardspack.minFilter);
  const maxFilter = useSelector<AppRootState, number>(state => state.cardspack.maxFilter);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(
      searchPacks(searchText, sortPacks, pageCount, page, userId, minFilter, maxFilter),
    );
  };

  const handleSearchValueChange = (value: string): void => {
    setSearchText(value);
  };

  return (
    <form onSubmit={handleSubmit} className={s.container}>
      <Input
        type="text"
        title={SEARCH}
        placeholder="Search..."
        onChangeText={(currentValue: string) => {
          handleSearchValueChange(currentValue);
        }}
        value={searchText}
      />
      <Button type="submit" condition={isFetching} className={s.buttonContainer}>
        Search
      </Button>
    </form>
  );
};
