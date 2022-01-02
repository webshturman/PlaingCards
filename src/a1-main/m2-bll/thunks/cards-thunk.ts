import { setStatusAC } from '../actions/app-actions';
import { setCardsData } from '../actions/cards-actions';
import { AppThunk } from '../store';

import { cardsAPI } from 'a1-main/m3-dal/cards-api';
import { cardsAddType } from 'a1-main/m3-dal/types/cardsType';

export const getCards =  // eslint-disable-next-line camelcase
  (cardsPack_id: string): AppThunk =>
  async (dispatch, getState) => {
    dispatch(setStatusAC(true));
    const { sortCards, page, pageCount } = getState().cards;
    try {
      // eslint-disable-next-line camelcase
      const response = await cardsAPI.getCardsList({
        cardsPack_id,
        sortCards,
        page,
        pageCount,
      });
      dispatch(setCardsData(response.data));
    } catch (error: any) {
      console.log(error);
    } finally {
      dispatch(setStatusAC(false));
    }
  };

export const addNewCard =
  (newCard: cardsAddType): AppThunk =>
  async dispatch => {
    dispatch(setStatusAC(true));
    try {
      await cardsAPI.addCard(newCard);
      dispatch(getCards(newCard.cardsPack_id));
    } catch (error: any) {
      console.log(error);
    } finally {
      dispatch(setStatusAC(false));
    }
  };

export const deleteCard =
  (cardId: string, packId: string): AppThunk =>
  async dispatch => {
    dispatch(setStatusAC(true));
    try {
      await cardsAPI.deleteCard(cardId);
      dispatch(getCards(packId));
    } catch (error: any) {
      console.log(error);
    } finally {
      dispatch(setStatusAC(false));
    }
  };

export const updateCardData =
  (cardId: string, question: string, packId: string): AppThunk =>
  async dispatch => {
    dispatch(setStatusAC(true));
    try {
      await cardsAPI.updateCard(cardId, question);
      dispatch(getCards(packId));
    } catch (error: any) {
      console.log(error);
    } finally {
      dispatch(setStatusAC(false));
    }
  };
