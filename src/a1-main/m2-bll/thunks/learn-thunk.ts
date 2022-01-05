import { setStatusAC } from '../actions/app-actions';
import { setCardsData } from '../actions/learn-actions';
import { AppThunk } from '../store';

import { learnAPI } from 'a1-main/m3-dal/learn-api';

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

export const sendCardRate =
  (rate: number, cardId: string): AppThunk =>
  async dispatch => {
    dispatch(setStatusAC(true));
    try {
      await learnAPI.sendCardRate(rate, cardId);
    } catch (error: any) {
      console.log(`Error sending card rate. ${error}`);
    } finally {
      dispatch(setStatusAC(false));
    }
  };
