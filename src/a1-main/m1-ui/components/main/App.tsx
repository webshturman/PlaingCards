import React, { FC, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { AppRootState } from '../../../m2-bll/store';
import { getAuthUserData } from '../../../m2-bll/thunks/auth-thunk';
import { ErrorAll } from '../common/ErrorAll';
import { Loader } from '../common/Loader';

import { Header } from './Header';
import { RoutesContainer } from './RoutesContainer';

import style from 'styles/App.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const App: FC = (): ReturnComponentType => {
  const dispatch = useDispatch();
  const isFetching = useSelector<AppRootState, boolean>(state => state.app.isFetching);
  const AuthUserStatus = useSelector<AppRootState, boolean>(state => state.auth.isAuth);
  useEffect(() => {
    dispatch(getAuthUserData());
  }, [AuthUserStatus]);

  if (isFetching) {
    return (
      <div className={style.container}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={style.container}>
      {/* <Loader /> */}
      <ErrorAll />
      <Header />
      <RoutesContainer />
    </div>
  );
};
