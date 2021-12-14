import { ReamePasswordType } from '../../a2-features/f3/NewPassword';
import { LetterType } from '../../a2-features/f3/RecoveryPassword';

import { instance } from './instance';

export const passwordAPI = {
  sendMessage(letterToThePost: LetterType) {
    return instance.post<any>(`auth/forgot`, letterToThePost);
  },
  updatePassword(newPassword: ReamePasswordType) {
    return instance.post<any>(`/auth/set-new-password`, newPassword);
  },
};
