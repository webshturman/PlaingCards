import { AxiosResponse } from 'axios';

import { instance } from './instance';
import { LoginCredentialsSendType } from './types/loginType';

export const authAPI = {
  login(credentials: LoginCredentialsSendType) {
    return instance.post<LoginCredentialsSendType, AxiosResponse<any>>(
      `auth/login`,
      credentials,
    );
  },
};
