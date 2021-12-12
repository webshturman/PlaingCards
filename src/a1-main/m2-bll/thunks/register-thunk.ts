import { credentialsType } from '../../m3-dal/types/registerType';
import { setRegisterStatus } from '../actions/register-actions';
import { AppThunk } from '../store';

import { registerAPI } from 'a1-main/m3-dal/register-api';

export const toSignUp =
  (credentials: credentialsType): AppThunk =>
  async dispatch => {
    try {
      await registerAPI.signUp(credentials);
      dispatch(setRegisterStatus(true));
    } catch (error: any) {
      console.log(error);
    }
  };
