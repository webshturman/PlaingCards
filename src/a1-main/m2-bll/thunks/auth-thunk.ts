import axios from 'axios';

import { setErrorMessageAC, setIsFethingAC, setStatusAC } from '../actions/app-actions';
import { setAuthStatus } from '../actions/auth-actions';
import { successRenamePasswordAC } from '../actions/password-actions';
import { deleteUserData, setAuthUserData } from '../actions/profile-actions';

import { AppThunk } from 'a1-main/m2-bll/store';
import { authAPI } from 'a1-main/m3-dal/auth-api';
import { LoginCredentialsSendType } from 'a1-main/m3-dal/types/loginType';

export const getAuthUserData = (): AppThunk => async dispatch => {
  dispatch(setIsFethingAC(true));
  try {
    const response = await authAPI.me();
    // dispatch(setAuthUserData(response.data, true));
    dispatch(setAuthUserData(response.data));
    dispatch(setAuthStatus(true));
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response.data.error;
      console.log(errorMessage);
      // dispatch(setErrorMessageAC(true, `Вы не авторизованы! ${errorMessage}`));
    } else if (axios.isAxiosError(error) && error.message === 'Network Error') {
      dispatch(setErrorMessageAC(true, `Нет соединения`));
    }
  } finally {
    dispatch(setIsFethingAC(false));
  }
};

export const toAuth =
  (credentials: LoginCredentialsSendType): AppThunk =>
  async dispatch => {
    dispatch(setStatusAC(true));
    try {
      const response = await authAPI.login(credentials);
      // dispatch(setAuthUserData(response.data, true));
      dispatch(setAuthUserData(response.data));
      dispatch(setAuthStatus(true));
      dispatch(successRenamePasswordAC(false));
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.error;
        dispatch(setErrorMessageAC(true, `login error: ${errorMessage}`));
      } else if (axios.isAxiosError(error) && error.message === 'Network Error') {
        dispatch(setErrorMessageAC(true, `no connection!`));
      }
    } finally {
      dispatch(setStatusAC(false));
    }
  };

export const deleteAuthUserData = (): AppThunk => async dispatch => {
  dispatch(setStatusAC(true));
  try {
    await authAPI.deleteMe();
    dispatch(deleteUserData());
    dispatch(setAuthStatus(false));
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response;
      dispatch(setErrorMessageAC(true, `you are not logged out: ${errorMessage}`));
    } else if (axios.isAxiosError(error) && error.message === 'Network Error') {
      dispatch(setErrorMessageAC(true, `you are not logged out:no connection!`));
    }
  } finally {
    dispatch(setStatusAC(false));
  }
};
