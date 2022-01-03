import axios from 'axios';

import { setErrorMessageAC, setStatusAC } from '../actions/app-actions';
import { AppThunk } from '../store';

import { updateUserData } from 'a1-main/m2-bll/actions/profile-actions';
import { authAPI } from 'a1-main/m3-dal/auth-api';
import { Nullable } from 'types/Nullable';

export const saveUserDataTC =
  (newName: Nullable<string>, newAvatar: Nullable<string> | undefined): AppThunk =>
  async dispatch => {
    dispatch(setStatusAC(true));
    try {
      await authAPI.renewDataUser(newName, newAvatar);
      dispatch(updateUserData(newName, newAvatar));
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
