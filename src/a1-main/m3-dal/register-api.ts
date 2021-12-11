import { AxiosResponse } from 'axios';

import { instance } from './instance';
import { credentialsType } from './types/registerType';

export const registerAPI = {
  signUp(credentials: credentialsType) {
    return instance.post<credentialsType, AxiosResponse<any>>(
      `auth/register`,
      credentials,
    );
  },
};
