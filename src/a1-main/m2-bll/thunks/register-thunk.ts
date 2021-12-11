import { setRegisterStatus } from '../actions/register-actions';
import { AppThunk } from '../store';

import { registerAPI } from 'a1-main/m3-dal/register-api';
import { credentialsType } from 'a1-main/m3-dal/types/registerType';

export const toSignUp =
  (credentials: credentialsType): AppThunk =>
  async dispatch => {
    // dispatch(ChangeLoadingStatusAC('loading'));
    try {
      const res = await registerAPI.signUp(credentials);
      dispatch(setRegisterStatus(true));
      console.log(res);
    } catch (error: any) {
      console.log(error);
    }
  };
