import axios from 'axios';

import { setErrorMessageAC, setStatusAC } from '../actions/app-actions';
import {
  successRenamePasswordAC,
  successSendMessgeAC,
} from '../actions/password-actions';
import { AppThunk } from '../store';

import { passwordAPI } from 'a1-main/m3-dal/password-api';
import { ReamePasswordType } from 'a2-features/f3/NewPassword';
import { LetterType } from 'a2-features/f3/RecoveryPassword';

export const sendMessageOnEmailTC =
  (letterToThePost: LetterType): AppThunk =>
  async dispatch => {
    dispatch(setStatusAC(true));
    try {
      await passwordAPI.sendMessage(letterToThePost);
      dispatch(successSendMessgeAC(true));
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.error;
        dispatch(setErrorMessageAC(true, `email not sent! ${errorMessage}`));
      } else if (axios.isAxiosError(error) && error.message === 'Network Error') {
        dispatch(setErrorMessageAC(true, `no connection!`));
      }
    } finally {
      dispatch(setStatusAC(false));
    }
  };

export const renamePasswordTC =
  (newPassword: ReamePasswordType): AppThunk =>
  async dispatch => {
    dispatch(setStatusAC(true));
    try {
      await passwordAPI.updatePassword(newPassword);
      dispatch(successRenamePasswordAC(true));
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.error;
        dispatch(
          setErrorMessageAC(
            true,
            `password has not been updated, try again! ${errorMessage}`,
          ),
        );
      } else if (axios.isAxiosError(error) && error.message === 'Network Error') {
        dispatch(setErrorMessageAC(true, `no connection!`));
      }
    } finally {
      dispatch(setStatusAC(false));
    }
  };
