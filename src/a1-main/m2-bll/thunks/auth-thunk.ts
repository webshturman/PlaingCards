import { ThunkDispatch } from 'redux-thunk';

import {
  AuthActionsType,
  setAuthUserData,
  toggleIsFetching,
} from '../actions/auth-actions';
import { nullAuthData } from '../reducers/auth-reducer';

import { AppRootState, AppThunk } from 'a1-main/m2-bll/store';
import { authAPI } from 'a1-main/m3-dal/auth-api';
import { LoginCredentialsSendType } from 'a1-main/m3-dal/types/loginType';
import { RESPONSE_STATUS_OK } from 'constants/common';

export const getAuthUserData =
  () => async (dispatch: ThunkDispatch<AppRootState, unknown, AuthActionsType>) => {
    try {
      const response = await authAPI.me();
      if (response.status === RESPONSE_STATUS_OK) {
        await dispatch(setAuthUserData({ isAuth: true, ...response.data }));
        console.log('login success, auth user data saved in store:');
        console.log(response.data);
      }
    } catch (error) {
      console.log(`Error getting auth user data: ${error}`);
    }
  };

export const toAuth =
  (credentials: LoginCredentialsSendType): AppThunk =>
  async (dispatch: ThunkDispatch<AppRootState, unknown, any>) => {
    try {
      const response = await authAPI.login(credentials);
      if (response.status === RESPONSE_STATUS_OK) {
        dispatch(getAuthUserData());
      }
    } catch (error: any) {
      console.log(`login ${error}`);
    }
  };

export const deleteAuthUserData =
  () => async (dispatch: ThunkDispatch<AppRootState, unknown, AuthActionsType>) => {
    try {
      const response = await authAPI.deleteMe();
      console.log(response);
      if (response.status === RESPONSE_STATUS_OK) {
        dispatch(setAuthUserData({ ...nullAuthData }));
        console.log('2');
        dispatch(toggleIsFetching(false));
        console.log('3');
      }
    } catch (error) {
      console.log(`Error deleting auth user data: ${error}`);
    }
  };
