import { cardsAPI } from '../../m3-dal/cards-api';
import { setStatusAC } from '../actions/app-actions';
import { setCardsData } from '../actions/cards-actions';
import { AppThunk } from '../store';

import { cardsAddType } from 'a1-main/m3-dal/types/cardsType';

export const getCards =
  (PackId: string, page: number): AppThunk =>
  async dispatch => {
    try {
      // eslint-disable-next-line camelcase
      const response = await cardsAPI.getCardsList(PackId, page);
      dispatch(setCardsData(response.data));
      // dispatch(setTotalCardsCount(response.data.cardsTotalCount));
    } catch (error: any) {
      console.log(error);
    }
  };

export const addNewCard =
  (newCard: cardsAddType): AppThunk =>
  async (dispatch, getState) => {
    const { page } = getState().cards;
    dispatch(setStatusAC(true));
    try {
      await cardsAPI.addCard(newCard);
      dispatch(getCards(newCard.cardsPack_id, page));
    } catch (error: any) {
      console.log(error);
    } finally {
      dispatch(setStatusAC(false));
    }
  };

export const deleteCard =
  (cardId: string, packId: string): AppThunk =>
  async (dispatch, getState) => {
    const { page } = getState().cards;
    dispatch(setStatusAC(true));
    try {
      await cardsAPI.deleteCard(cardId);
      dispatch(getCards(packId, page));
    } catch (error: any) {
      console.log(error);
    } finally {
      dispatch(setStatusAC(false));
    }
  };

export const updateCardData =
  (cardId: string, question: string, packId: string): AppThunk =>
  async (dispatch, getState) => {
    const { page } = getState().cards;
    dispatch(setStatusAC(true));
    try {
      await cardsAPI.updateCard(cardId, question);
      dispatch(getCards(packId, page));
    } catch (error: any) {
      console.log(error);
    } finally {
      dispatch(setStatusAC(false));
    }
  };
