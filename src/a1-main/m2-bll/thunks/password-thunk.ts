import axios from 'axios';

import { ReamePasswordType } from '../../../a2-features/f3/NewPassword';
import { LetterType } from '../../../a2-features/f3/RecoveryPassword';
import { passwordAPI } from '../../m3-dal/password-api';
import { setErrorMessageAC, setIsFethingAC } from '../actions/app-actions';
import {
  successRenamePasswordAC,
  successSendMessgeAC,
} from '../actions/password-actions';
import { AppThunk } from '../store';

export const sendMessageOnEmail =
  (letterToThePost: LetterType): AppThunk =>
  async dispatch => {
    dispatch(setIsFethingAC(true));
    try {
      await passwordAPI.sendMessage(letterToThePost);
      dispatch(successSendMessgeAC(true));
      dispatch(setErrorMessageAC(false, ''));
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error);
        const errorMessage = error.response.data.error;
        dispatch(
          setErrorMessageAC(true, `Не получилось отправить письмо! ${errorMessage}`),
        );
      } else if (axios.isAxiosError(error) && error.message === 'Network Error') {
        console.log(error);
        console.log(JSON.stringify(error));
        dispatch(setErrorMessageAC(true, `Нет соединения`));
      }
    } finally {
      dispatch(setIsFethingAC(false));
    }
  };

export const renamePassword =
  (newPassword: ReamePasswordType): AppThunk =>
  async dispatch => {
    dispatch(setIsFethingAC(true));
    try {
      await passwordAPI.updatePassword(newPassword);
      dispatch(successRenamePasswordAC(true));
      dispatch(setErrorMessageAC(false, ''));
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.error;
        dispatch(
          setErrorMessageAC(
            true,
            `Пароль не обновился пропробуйте снова! ${errorMessage}`,
          ),
        );
      } else if (axios.isAxiosError(error) && error.message === 'Network Error') {
        dispatch(setErrorMessageAC(true, `Нет соединения`));
      }
    } finally {
      dispatch(setIsFethingAC(false));
    }
  };
