import axios from 'axios';

import { cardsPackAPI } from '../../m3-dal/cardspack-api';
import { searchApi } from '../../m3-dal/search-api';
import { setErrorMessageAC, setStatusAC } from '../actions/app-actions';
import { AppThunk } from '../store';

import { EMPTY_STRING } from 'constants/common';

export enum ACTIONS_TYPE_CARDS_PACK {
  GET_CARDS_PACK_DATA = 'cardspack-reducer/GET-CARDS-PACK-DATA',
  SORT_CARDS_PACK_DATA = 'cardspack-reducer/SORT-CARDS-PACK-DATA',
  SET_CURRENT_PAGE = 'cardspack-reducer/SET-CURRENT-PAGE',
  SET_CARD_PACKS_TOTAL_COUNT = 'cardspack-reducer/SET-CARD-PACKS-TOTAL-COUNT',
  SET_SEARCH_TEXT = 'cardspack-reducer/SET-SEARCH-TEXT',
  SET_MIN_CARDS_COUNT = 'cardspack-reducer/SET-MIN-CARDS-COUNT',
  SET_MAX_CARDS_COUNT = 'cardspack-reducer/SET-MAX-CARDS-COUNT',
  SET_MIN_FILTER = 'cardspack-reducer/SET-MIN-FILTER',
  SET_MAX_FILTER = 'cardspack-reducer/SET-MAX-FILTER',
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
  minFilter: 0,
  maxFilter: 50,
};

type InitialPackCardStateStateType = typeof initialPackCardState;

export type CardsPackActionType =
  | ReturnType<typeof setPackCardsAC>
  | ReturnType<typeof setCardsPackTotalCountAC>
  | ReturnType<typeof setCurrentPageAC>
  | ReturnType<typeof SortPackCardsAC>
  | ReturnType<typeof setSearchText>
  | ReturnType<typeof setMinCardsCount>
  | ReturnType<typeof setMaxCardsCount>
  | ReturnType<typeof setMinFilter>
  | ReturnType<typeof setMaxFilter>;

export const setMinFilter = (min: number) =>
  ({ type: ACTIONS_TYPE_CARDS_PACK.SET_MIN_FILTER, min } as const);

export const setMaxFilter = (max: number) =>
  ({ type: ACTIONS_TYPE_CARDS_PACK.SET_MAX_FILTER, max } as const);

export const setMinCardsCount = (minCardsCount: number) =>
  ({ type: ACTIONS_TYPE_CARDS_PACK.SET_MIN_CARDS_COUNT, minCardsCount } as const);

export const setMaxCardsCount = (maxCardsCount: number) =>
  ({ type: ACTIONS_TYPE_CARDS_PACK.SET_MAX_CARDS_COUNT, maxCardsCount } as const);

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
    case ACTIONS_TYPE_CARDS_PACK.SET_MIN_CARDS_COUNT:
      return { ...state, minCardsCount: action.minCardsCount };
    case ACTIONS_TYPE_CARDS_PACK.SET_MAX_CARDS_COUNT:
      return { ...state, maxCardsCount: action.maxCardsCount };
    case ACTIONS_TYPE_CARDS_PACK.SET_MIN_FILTER:
      return { ...state, minFilter: action.min };
    case ACTIONS_TYPE_CARDS_PACK.SET_MAX_FILTER:
      return { ...state, maxFilter: action.max };
    default:
      return state;
  }
};

export const SortPackCardsAC = (sortValue: string) =>
  ({ type: ACTIONS_TYPE_CARDS_PACK.SORT_CARDS_PACK_DATA, sortValue } as const);

export const setPackCardsTC =
  (userId: string): AppThunk =>
  async (dispatch, getState) => {
    const { sortPacks, pageCount, page, searchText, minCardsCount, maxCardsCount } =
      getState().cardspack;
    dispatch(setStatusAC(true));
    if (!searchText) {
      try {
        const cardsPack = await cardsPackAPI.readCardsPack(
          sortPacks,
          pageCount,
          page,
          userId,
        );
        dispatch(setPackCardsAC(cardsPack.data.cardPacks));
        dispatch(setCardsPackTotalCountAC(cardsPack.data.cardPacksTotalCount));
        dispatch(setMinCardsCount(cardsPack.data.minCardsCount));
        dispatch(setMaxCardsCount(cardsPack.data.maxCardsCount));
        if (minCardsCount !== cardsPack.data.minCardsCount) {
          dispatch(setMinFilter(cardsPack.data.minCardsCount));
        }
        if (maxCardsCount !== cardsPack.data.maxCardsCount) {
          dispatch(setMaxFilter(cardsPack.data.maxCardsCount));
        }
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
        const response = await searchApi.searchPacks(
          sortPacks,
          searchText,
          pageCount,
          page,
          userId,
          minCardsCount,
          maxCardsCount,
        );
        dispatch(setPackCardsAC(response.data.cardPacks));
        dispatch(setCardsPackTotalCountAC(response.data.cardPacksTotalCount));
        dispatch(setMinCardsCount(response.data.minCardsCount));
        dispatch(setMaxCardsCount(response.data.maxCardsCount));
        if (minCardsCount !== response.data.minCardsCount) {
          dispatch(setMinFilter(response.data.minCardsCount));
        }
        if (maxCardsCount !== response.data.maxCardsCount) {
          dispatch(setMaxFilter(response.data.maxCardsCount));
        }
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
  (name: string, userId: string): AppThunk =>
  async dispatch => {
    dispatch(setStatusAC(true));
    try {
      const cardsPack = await cardsPackAPI.createCardsPack(name);
      dispatch(setPackCardsTC(userId));
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
      dispatch(setPackCardsTC(EMPTY_STRING));
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
      dispatch(setPackCardsTC(EMPTY_STRING));
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
