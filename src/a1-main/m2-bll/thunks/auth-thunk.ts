import { RESPONSE_STATUS_OK } from '../../../constants/common';
import { authAPI } from '../../m3-dal/auth-api';
import { LoginCredentialsSendType } from '../../m3-dal/types/loginType';
import { setAuthUserData } from '../actions/auth-actions';
import { AppThunk } from '../store';

export const toAuth =
  (credentials: LoginCredentialsSendType): AppThunk =>
  async dispatch => {
    try {
      const response = await authAPI.login(credentials);
      if (response.status === RESPONSE_STATUS_OK) {
        dispatch(setAuthUserData({ ...response.data }));
        console.log('login success, auth user data saved in store:');
        console.log(response.data);
      }
    } catch (error: any) {
      console.log(`login ${error}`);
    }
  };
