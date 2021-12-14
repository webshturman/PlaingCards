import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { toggleIsFetching } from '../../m2-bll/actions/auth-actions';
import { deleteAuthUserData } from '../../m2-bll/thunks/auth-thunk';

import { Button } from './common/CustomButton/Button';
import { Loader } from './common/Loader';

import { AppRootState } from 'a1-main/m2-bll/store';
import { PATH } from 'enums/routes';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const Profile = (): ReturnComponentType => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(toggleIsFetching(false));
  }, []);

  const AuthUserStatus = useSelector<AppRootState, boolean>(state => state.auth.isAuth);
  const isFetching = useSelector<AppRootState, boolean>(state => state.auth.isFetching);

  const logOut = (): void => {
    dispatch(toggleIsFetching(true));
    dispatch(deleteAuthUserData());
  };

  if (!AuthUserStatus) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return (
    <div>
      <div>Profile</div>
      <div>
        <Button onClick={logOut} condition={isFetching}>
          Log out
        </Button>
      </div>
      {isFetching && Loader}
    </div>
  );
};
