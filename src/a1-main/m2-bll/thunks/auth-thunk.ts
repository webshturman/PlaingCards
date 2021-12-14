import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';

import { setErrorMessageAC, setIsFethingAC } from '../actions/app-actions';
import {
  AuthActionsType,
  setAuthUserData,
  toggleIsFetching,
} from '../actions/auth-actions';
import { successRenamePasswordAC } from '../actions/password-actions';
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
  async dispatch => {
    dispatch(setIsFethingAC(true));
    try {
      const response = await authAPI.login(credentials);
      if (response.status === RESPONSE_STATUS_OK) {
        dispatch(setAuthUserData({ ...response.data }));
        dispatch(successRenamePasswordAC(false));
        dispatch(setErrorMessageAC(false, ''));
        dispatch(setIsFethingAC(false));
        console.log('login success, auth user data saved in store:');
        console.log(response.data);
        dispatch(getAuthUserData());
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.error;
        dispatch(setErrorMessageAC(true, `login error: ${errorMessage}`));
        dispatch(setIsFethingAC(false));
        console.log(`login ${error}`);
      }
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
