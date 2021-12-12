import { LetterType } from '../../../a2-features/f3/RecoveryPassword';
import { ReamePasswordType } from '../../../a2-features/NewPassword';
import { passwordAPI } from '../../m3-dal/register-api';
import {
  successRenamePasswordAC,
  successSendMessgeAC,
} from '../actions/password-actions';
import { AppThunk } from '../store';

export const sendMessageOnEmail =
  (letterToThePost: LetterType): AppThunk =>
  async dispatch => {
    try {
      const data = await passwordAPI.sendMessage(letterToThePost);
      dispatch(successSendMessgeAC(data.data.success));
      console.log(data.data.success);
    } catch (error: any) {
      console.log(error);
    }
  };

export const renamePassword =
  (newPassword: ReamePasswordType): AppThunk =>
  async dispatch => {
    try {
      const data = await passwordAPI.updatePassword(newPassword);
      dispatch(successRenamePasswordAC(data.data));
      console.log(data.data);
    } catch (error: any) {
      console.log(error);
    }
  };
