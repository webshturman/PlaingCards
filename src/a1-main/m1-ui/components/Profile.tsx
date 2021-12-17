import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { PATH } from '../../../enums/routes';
import { deleteAuthUserData } from '../../m2-bll/thunks/auth-thunk';

import { Button } from './common/CustomButton/Button';

import { AppRootState } from 'a1-main/m2-bll/store';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const Profile = (): ReturnComponentType => {
  const dispatch = useDispatch();

  const AuthUserStatus = useSelector<AppRootState, boolean>(state => state.auth.isAuth);
  const isFetching = useSelector<AppRootState, boolean>(state => state.app.isFetching);

  const logOut = (): void => {
    dispatch(deleteAuthUserData());
  };

  if (!AuthUserStatus) return <Navigate to={PATH.LOGIN_FORM} />;

  console.log('gggggggggggggggg');
  return (
    <div>
      <div>Profile</div>
      <div>
        <Button onClick={logOut} condition={isFetching}>
          Log out
        </Button>
      </div>
    </div>
  );
};
