import axios from 'axios';

import { setErrorMessageAC, setIsFethingAC } from '../actions/app-actions';
import { setAuthUserData } from '../actions/auth-actions';
import { successRenamePasswordAC } from '../actions/password-actions';
import { nullAuthData } from '../reducers/auth-reducer';

import { AppThunk } from 'a1-main/m2-bll/store';
import { authAPI } from 'a1-main/m3-dal/auth-api';
import { LoginCredentialsSendType } from 'a1-main/m3-dal/types/loginType';

export const getAuthUserData = (): AppThunk => async dispatch => {
  dispatch(setIsFethingAC(true));
  try {
    const response = await authAPI.me();
    dispatch(setAuthUserData({ isAuth: true, ...response.data }));
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.log(error);
    }
    if (error) {
      console.log(error);
    }
  } finally {
    dispatch(setIsFethingAC(false));
  }
};

export const toAuth =
  (credentials: LoginCredentialsSendType): AppThunk =>
  async dispatch => {
    dispatch(setIsFethingAC(true));
    try {
      const response = await authAPI.login(credentials);
      dispatch(setAuthUserData({ ...response.data }));
      dispatch(successRenamePasswordAC(false));
      dispatch(getAuthUserData());
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.error;
        dispatch(setErrorMessageAC(true, `login error: ${errorMessage}`));
      } else if (axios.isAxiosError(error) && error.message === 'Network Error') {
        dispatch(setErrorMessageAC(true, `no connection!`));
      }
    } finally {
      dispatch(setIsFethingAC(false));
    }
  };

export const deleteAuthUserData = (): AppThunk => async dispatch => {
  dispatch(setIsFethingAC(true));
  try {
    await authAPI.deleteMe();
    dispatch(setAuthUserData({ ...nullAuthData }));
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response;
      dispatch(setErrorMessageAC(true, `you are not logged out: ${errorMessage}`));
    } else if (axios.isAxiosError(error) && error.message === 'Network Error') {
      dispatch(setErrorMessageAC(true, `you are not logged out:no connection!`));
    }
  } finally {
    dispatch(setIsFethingAC(false));
  }
};
