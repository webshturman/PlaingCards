import axios from 'axios';

import { setErrorMessageAC, setStatusAC } from '../actions/app-actions';
import { AppThunk } from '../store';

import { authAPI } from 'a1-main/m3-dal/auth-api';

export const saveUserDataTC =
  (newName: string, newAvatar: File): AppThunk =>
  async dispatch => {
    dispatch(setStatusAC(true));
    try {
      await authAPI.renewDataUser(newName, newAvatar);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response;
        dispatch(setErrorMessageAC(true, `Error: ${errorMessage}`));
      } else if (axios.isAxiosError(error) && error.message === 'Network Error') {
        dispatch(setErrorMessageAC(true, `Error:no connection!`));
      }
    } finally {
      dispatch(setStatusAC(false));
    }
  };
