import { AxiosResponse } from 'axios';

import { LetterType } from '../../a2-features/f3/RecoveryPassword';
import { ReamePasswordType } from '../../a2-features/NewPassword';

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

export const passwordAPI = {
  sendMessage(letterToThePost: LetterType) {
    return instance.post<any>(`auth/forgot`, letterToThePost);
  },
  updatePassword(newPassword: ReamePasswordType) {
    return instance.post<any>(`/auth/set-new-password`, newPassword);
  },
};
