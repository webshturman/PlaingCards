import axios from 'axios';

import { credentialsType } from '../../m3-dal/types/registerType';
import { setErrorMessageAC, setIsFethingAC } from '../actions/app-actions';
import { setRegisterStatus } from '../actions/register-actions';
import { AppThunk } from '../store';

import { registerAPI } from 'a1-main/m3-dal/register-api';

export const toSignUp =
  (credentials: credentialsType): AppThunk =>
  async dispatch => {
    dispatch(setIsFethingAC(true));
    try {
      await registerAPI.signUp(credentials);
      dispatch(setRegisterStatus(true));
      dispatch(setErrorMessageAC(false, ''));
      dispatch(setIsFethingAC(false));
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.error;
        dispatch(setErrorMessageAC(true, `Регистрация не прошла! ${errorMessage}`));
        dispatch(setIsFethingAC(false));
      }
    }
  };
