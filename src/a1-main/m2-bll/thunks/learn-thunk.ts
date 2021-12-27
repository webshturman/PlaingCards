import { learnAPI } from '../../m3-dal/learn-api';
import { setStatusAC } from '../actions/app-actions';
import {
  setAnswerStatus,
  setCardsData,
  setQuestionNumber,
} from '../actions/learn-actions';
import { AppThunk } from '../store';

export const getCards =  // eslint-disable-next-line camelcase
  (cardsPack_id: string): AppThunk =>
  async dispatch => {
    const page = 1;
    const pageCount = 9999;
    dispatch(setStatusAC(true));
    try {
      const response = await learnAPI.getCardsList({
        cardsPack_id,
        page,
        pageCount,
      });
      dispatch(setCardsData(response.data));
      dispatch(setStatusAC(false));
    } catch (error: any) {
      console.log(`Error getting cards. ${error}`);
    } finally {
      dispatch(setStatusAC(false));
    }
  };

export const changeQuestionNumber =
  (questionNumber: number): AppThunk =>
  async dispatch => {
    try {
      dispatch(setQuestionNumber(questionNumber));
    } catch (error: any) {
      console.log(`Error setting question number. ${error}`);
    }
  };

export const changeAnswerStatus =
  (answer: boolean): AppThunk =>
  async dispatch => {
    try {
      dispatch(setAnswerStatus(answer));
    } catch (error: any) {
      console.log(`Error setting answer status. ${error}`);
    }
  };
