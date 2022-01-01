import axios from 'axios';

import { setErrorMessageAC, setStatusAC } from '../actions/app-actions';
import { setRegisterStatus } from '../actions/register-actions';
import { AppThunk } from '../store';

import { registerAPI } from 'a1-main/m3-dal/register-api';
import { credentialsType } from 'a1-main/m3-dal/types/registerType';

export const toSignUp =
  (credentials: credentialsType): AppThunk =>
  async dispatch => {
    dispatch(setStatusAC(true));
    try {
      await registerAPI.signUp(credentials);
      dispatch(setRegisterStatus(true));
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.error;
        dispatch(setErrorMessageAC(true, `registration failed! ${errorMessage}`));
      } else if (axios.isAxiosError(error) && error.message === 'Network Error') {
        dispatch(setErrorMessageAC(true, `no connection!`));
      }
    } finally {
      dispatch(setStatusAC(false));
    }
  };
