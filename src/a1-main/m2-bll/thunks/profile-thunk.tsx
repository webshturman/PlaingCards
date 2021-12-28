import axios from 'axios';

import { authAPI } from '../../m3-dal/auth-api';
import { setErrorMessageAC, setStatusAC } from '../actions/app-actions';
import { AppThunk } from '../store';

export const saveUserDataTC =
  (newName: string, newAvatar: File): AppThunk =>
  async dispatch => {
    console.log('2');
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
