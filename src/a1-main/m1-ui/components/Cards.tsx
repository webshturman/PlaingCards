import React from 'react';

import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { PATH } from '../../../enums/routes';
import { AppRootState } from '../../m2-bll/store';

import { ReturnComponentType } from 'types/ReturnComponentType';

export const Cards = (): ReturnComponentType => {
  const AuthUserStatus = useSelector<AppRootState, boolean>(state => state.auth.isAuth);
  if (!AuthUserStatus) return <Navigate to={PATH.LOGIN_FORM} />;
  return (
    <div>
      <Outlet />
    </div>
  );
};
