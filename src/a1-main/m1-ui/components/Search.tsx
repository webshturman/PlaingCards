import React, { FC, FormEvent, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { AppRootState } from '../../m2-bll/store';
import { searchPacks } from '../../m2-bll/thunks/search-thunk';

import { Button } from './common/CustomButton/Button';
import { Input } from './common/CustomInput/Input';

import { EMPTY_STRING, SEARCH } from 'constants/common';
import s from 'styles/search.module.css';

type SearchType = {
  // eslint-disable-next-line react/require-default-props
  userId?: string;
};
export const Search: FC<SearchType> = ({ userId }): any => {
  const dispatch = useDispatch();
  const isFetching = useSelector<AppRootState, boolean>(state => state.app.isFetching);
  const sortPacks = useSelector<AppRootState, string>(state => state.cardspack.sortPacks);
  const pageCount = useSelector<AppRootState, number>(state => state.cardspack.pageCount);
  const page = useSelector<AppRootState, number>(state => state.cardspack.page);
  const minFilter = useSelector<AppRootState, number>(state => state.cardspack.minFilter);
  const maxFilter = useSelector<AppRootState, number>(state => state.cardspack.maxFilter);
  const [searchText, setSearchText] = useState<string>(EMPTY_STRING);
  const handleSubmit = (e: FormEvent<HTMLFormElement>): any => {
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
