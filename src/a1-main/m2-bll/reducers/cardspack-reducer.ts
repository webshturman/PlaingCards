import axios from 'axios';

import { cardsPackAPI } from '../../m3-dal/cardspack-api';
import { setErrorMessageAC, setStatusAC } from '../actions/app-actions';
import { AppThunk } from '../store';

import { searchApi } from 'a1-main/m3-dal/search-api';

export enum ACTIONS_TYPE_CARDS_PACK {
  GET_CARDS_PACK_DATA = 'cardspack-reducer/GET_CARDS_PACK_DATA',
  SORT_CARDS_PACK_DATA = 'cardspack-reducer/SORT_CARDS_PACK_DATA',
  SET_CURRENT_PAGE = 'cardspack-reducer/SET-CURRENT-PAGE',
  SET_CARD_PACKS_TOTAL_COUNT = 'cardspack-reducer/SET-CARD-PACKS-TOTAL-COUNT',
  SET_SEARCH_TEXT = 'cardspack-reducer/SET-SEARCH-TEXT',
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
  pageCount: 4,
  portionSize: 10,
  token: '',
  tokenDeathTime: 0,
  sortPacks: '0updated',
  searchText: '',
};

type InitialPackCardStateStateType = typeof initialPackCardState;

export type CardsPackActionType =
  | ReturnType<typeof setPackCardsAC>
  | ReturnType<typeof setCardsPackTotalCountAC>
  | ReturnType<typeof setCurrentPageAC>
  | ReturnType<typeof SortPackCardsAC>
  | ReturnType<typeof setSearchText>;

export const setSearchText = (searchText: string) =>
  ({ type: ACTIONS_TYPE_CARDS_PACK.SET_SEARCH_TEXT, searchText } as const);

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
    case ACTIONS_TYPE_CARDS_PACK.SET_SEARCH_TEXT:
      return { ...state, searchText: action.searchText };
    default:
      return state;
  }
};

export const SortPackCardsAC = (sortValue: string) =>
  ({ type: ACTIONS_TYPE_CARDS_PACK.SORT_CARDS_PACK_DATA, sortValue } as const);

export const setPackCardsTC = (): AppThunk => async (dispatch, getState) => {
  const { sortPacks, pageCount, page, searchText } = getState().cardspack;
  dispatch(setStatusAC(true));
  if (!searchText) {
    try {
      const cardsPack = await cardsPackAPI.readCardsPack(sortPacks, pageCount, page);
      dispatch(setPackCardsAC(cardsPack.data.cardPacks));
      dispatch(setCardsPackTotalCountAC(cardsPack.data.cardPacksTotalCount));
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
  } else {
    try {
      const response = await searchApi.searchPacks(searchText, pageCount, page);
      dispatch(setPackCardsAC(response.data.cardPacks));
      dispatch(setCardsPackTotalCountAC(response.data.cardPacksTotalCount));
      dispatch(setSearchText(''));
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
