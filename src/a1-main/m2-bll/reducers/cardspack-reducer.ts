import axios from 'axios';

import { cardsPackAPI } from '../../m3-dal/cardspack-api';
import { setErrorMessageAC, setStatusAC } from '../actions/app-actions';
import { AppThunk } from '../store';

export enum ACTIONS_TYPE_CARDS {
  GET_CARDS_DATA = 'cards-reducer/GET_CARDS_DATA',
}
export type initialProfileStateType = {
  packCards: Array<any>;
};

const initialProfileState: initialProfileStateType = {
  packCards: [],
};

export const cardsPackReducer = (
  state: initialProfileStateType = initialProfileState,
  action: CardsPackActionType,
): initialProfileStateType => {
  switch (action.type) {
    case ACTIONS_TYPE_CARDS.GET_CARDS_DATA:
      return { ...state, packCards: action.packCards };
    default:
      return state;
  }
};

export type CardsPackActionType = ReturnType<typeof getPackCardsAC>;

export const getPackCardsAC = (packCards: any) =>
  ({ type: ACTIONS_TYPE_CARDS.GET_CARDS_DATA, packCards } as const);

export const getPackCards = (): AppThunk => async dispatch => {
  dispatch(setStatusAC(true));
  try {
    const cardsPack = await cardsPackAPI.readCardsPack();
    dispatch(getPackCardsAC(cardsPack.data.cardPacks));
    // dispatch(setIsFethingAC(false));
    console.log(cardsPack.data.cardPacks);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response;
      dispatch(setErrorMessageAC(true, `you are not logged out: ${errorMessage}`));
    } else if (axios.isAxiosError(error) && error.message === 'Network Error') {
      dispatch(setErrorMessageAC(true, `you are not logged out:no connection!`));
    }
  } finally {
    dispatch(setStatusAC(false));
  }
};
