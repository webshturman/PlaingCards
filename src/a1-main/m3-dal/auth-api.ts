import { AxiosResponse } from 'axios';

import { instance } from 'a1-main/m3-dal/instance';
import {
  DeleteMeResponseStateType,
  LoginCredentialsSendType,
  MeResponseStateType,
} from 'a1-main/m3-dal/types/loginType';

export const authAPI = {
  login(credentials: LoginCredentialsSendType) {
    return instance.post<LoginCredentialsSendType, AxiosResponse<MeResponseStateType>>(
      `auth/login`,
      credentials,
    );
  },

  me() {
    return instance.post<{}, AxiosResponse<MeResponseStateType>>(`auth/me`, {});
  },

  deleteMe() {
    return instance.delete<AxiosResponse<DeleteMeResponseStateType>>(`auth/me`);
  },
};
