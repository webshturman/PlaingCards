import React, { FormEvent, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { AppRootState } from '../../m2-bll/store';
import { searchPacks } from '../../m2-bll/thunks/search-thunk';

import { Button } from './common/CustomButton/Button';
import { Input } from './common/CustomInput/Input';

import { EMPTY_STRING, SEARCH } from 'constants/common';
import s from 'styles/search.module.css';

export const Search = (): any => {
  const dispatch = useDispatch();
  const isFetching = useSelector<AppRootState, boolean>(state => state.app.isFetching);
  const [searchText, setSearchText] = useState<string>(EMPTY_STRING);
  const handleSubmit = (e: FormEvent<HTMLFormElement>): any => {
    e.preventDefault();
    dispatch(searchPacks(searchText));
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
