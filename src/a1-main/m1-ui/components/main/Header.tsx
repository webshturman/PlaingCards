import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { AppRootState } from '../../../m2-bll/store';
import { Button } from '../common/CustomButton/Button';

import { setEmailAC } from 'a1-main/m2-bll/actions/app-actions';
import { deleteAuthUserData } from 'a1-main/m2-bll/thunks/auth-thunk';
import { PATH } from 'enums/routes';
import style from 'styles/Header.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const Header = (): ReturnComponentType => {
  const AuthUserStatus = useSelector<AppRootState, boolean>(state => state.auth.isAuth);
  const isFetching = useSelector<AppRootState, boolean>(state => state.app.isFetching);
  const dispatch = useDispatch();
  const logOut = (): void => {
    dispatch(deleteAuthUserData());
    dispatch(setEmailAC(''));
  };
  return (
    <div className={style.header}>
      <div className={style.headerContainer}>
        <h1 className={style.title}>Playing Cards</h1>
        {AuthUserStatus && (
          <div className={style.headerBlock}>
            <div className={style.itemMenu}>
              <NavLink
                to={PATH.PROFILE}
                className={({ isActive }) => (isActive ? style.active : '')}
              >
                Profile
              </NavLink>
            </div>
            <div className={style.itemMenu}>
              <NavLink
                to={PATH.CARDS}
                className={({ isActive }) => (isActive ? style.active : '')}
              >
                Packs List
              </NavLink>
            </div>
            <div className={style.logout}>
              <Button onClick={logOut} disabled={isFetching}>
                Log out
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
