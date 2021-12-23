import axios from 'axios';

import { cardsPackAPI } from '../../m3-dal/cardspack-api';
import { setErrorMessageAC, setStatusAC } from '../actions/app-actions';
import { AppThunk } from '../store';

export enum ACTIONS_TYPE_CARDS_PACK {
  GET_CARDS_PACK_DATA = 'cardspack-reducer/GET_CARDS_PACK_DATA',
  SORT_CARDS_PACK_DATA = 'cardspack-reducer/SORT_CARDS_PACK_DATA',
  SET_CURRENT_PAGE = 'cardspack-reducer/SET-CURRENT-PAGE',
  SET_CARD_PACKS_TOTAL_COUNT = 'cardspack-reducer/SET-CARD-PACKS-TOTAL-COUNT',
  // SORT_CARDS_PACK_DATA = 'cardspack-reducer/SORT_CARDS_PACK_DATA',
}

export type PacksType = {
  cardsCount: number;
  created: string;
  grade: number;
  // eslint-disable-next-line camelcase
  more_id: string;
  name: string;
  path: string;
  private: boolean;
  rating: number;
  shots: number;
  type: string;
  updated: string;
  // eslint-disable-next-line camelcase
  user_id: string;
  // eslint-disable-next-line camelcase
  user_name: string;
  __v: number;
  _id: string;
};

const initialPackCardState = {
  cardPacks: [] as Array<PacksType>,
  cardPacksTotalCount: 0,
  maxCardsCount: 0,
  minCardsCount: 0,
  page: 1,
  pageCount: 3,
  portionSize: 10,
  token: '',
  tokenDeathTime: 0,
  sortPacks: '0updated',
};

type InitialPackCardStateStateType = typeof initialPackCardState;

export type CardsPackActionType =
  | ReturnType<typeof setPackCardsAC>
  | ReturnType<typeof setCardsPackTotalCountAC>
  | ReturnType<typeof setCurrentPageAC>
  | ReturnType<typeof SortPackCardsAC>;

export const setPackCardsAC = (cardPacks: Array<PacksType>) =>
  ({ type: ACTIONS_TYPE_CARDS_PACK.GET_CARDS_PACK_DATA, cardPacks } as const);

export const setCurrentPageAC = (page: number) =>
  ({ type: ACTIONS_TYPE_CARDS_PACK.SET_CURRENT_PAGE, page } as const);

export const setCardsPackTotalCountAC = (cardPacksTotalCount: number) =>
  ({
    type: ACTIONS_TYPE_CARDS_PACK.SET_CARD_PACKS_TOTAL_COUNT,
    cardPacksTotalCount,
  } as const);

export const cardsPackReducer = (
  state: InitialPackCardStateStateType = initialPackCardState,
  action: CardsPackActionType,
): InitialPackCardStateStateType => {
  switch (action.type) {
    case ACTIONS_TYPE_CARDS_PACK.GET_CARDS_PACK_DATA:
      return { ...state, cardPacks: action.cardPacks };
    case ACTIONS_TYPE_CARDS_PACK.SORT_CARDS_PACK_DATA:
      return { ...state, sortPacks: action.sortValue };
    case ACTIONS_TYPE_CARDS_PACK.SET_CURRENT_PAGE:
      return { ...state, page: action.page };
    case ACTIONS_TYPE_CARDS_PACK.SET_CARD_PACKS_TOTAL_COUNT:
      return { ...state, cardPacksTotalCount: action.cardPacksTotalCount };
    default:
      return state;
  }
};

export const SortPackCardsAC = (sortValue: string) =>
  ({ type: ACTIONS_TYPE_CARDS_PACK.SORT_CARDS_PACK_DATA, sortValue } as const);

export const setPackCardsTC = (): AppThunk => async (dispatch, getState) => {
  const { sortPacks, pageCount } = getState().cardspack;
  dispatch(setStatusAC(true));
  try {
    const cardsPack = await cardsPackAPI.readCardsPack(sortPacks, pageCount);
    dispatch(setPackCardsAC(cardsPack.data.cardPacks));
    console.log(cardsPack.data.cardPacksTotalCount);
    // dispatch(setCardsPackTotalCountAC(cardsPack.data.cardPacksTotalCount));
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response;
      dispatch(setErrorMessageAC(true, `error: ${errorMessage}`));
    } else if (axios.isAxiosError(error) && error.message === 'Network Error') {
      dispatch(setErrorMessageAC(true, `you are not logged out:no connection!`));
    }
  } finally {
    dispatch(setStatusAC(false));
  }
};

export const createPackCardsTC =
  (name: string): AppThunk =>
  async dispatch => {
    dispatch(setStatusAC(true));
    try {
      const cardsPack = await cardsPackAPI.createCardsPack(name);
      dispatch(setPackCardsTC());
      console.log(cardsPack.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response;
        dispatch(setErrorMessageAC(true, `error: ${errorMessage}`));
      } else if (axios.isAxiosError(error) && error.message === 'Network Error') {
        dispatch(setErrorMessageAC(true, `you are not logged out:no connection!`));
      }
    } finally {
      dispatch(setStatusAC(false));
    }
  };

export const deletePackCardsTC =
  (_id: string): AppThunk =>
  async dispatch => {
    dispatch(setStatusAC(true));
    try {
      const cardsPack = await cardsPackAPI.deleteCardsPack(_id);
      dispatch(setPackCardsTC());
      console.log(cardsPack.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response;
        dispatch(setErrorMessageAC(true, `error: ${errorMessage}`));
      } else if (axios.isAxiosError(error) && error.message === 'Network Error') {
        dispatch(setErrorMessageAC(true, `you are not logged out:no connection!`));
      }
    } finally {
      dispatch(setStatusAC(false));
    }
  };

export const updatePackCardsTC =
  (_id: string, name: string): AppThunk =>
  async dispatch => {
    dispatch(setStatusAC(true));
    try {
      const cardsPack = await cardsPackAPI.updatesCardsPack(_id, name);
      dispatch(setPackCardsTC());
      console.log(cardsPack.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response;
        dispatch(setErrorMessageAC(true, `error: ${errorMessage}`));
      } else if (axios.isAxiosError(error) && error.message === 'Network Error') {
        dispatch(setErrorMessageAC(true, `you are not logged out:no connection!`));
      }
    } finally {
      dispatch(setStatusAC(false));
    }
  };
