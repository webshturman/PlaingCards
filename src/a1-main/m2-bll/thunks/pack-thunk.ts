import axios from 'axios';

import { setErrorMessageAC, setStatusAC } from '../actions/app-actions';
import {
  setCardsPackTotalCountAC,
  setMaxCardsCount,
  setMaxFilter,
  setMinCardsCount,
  setMinFilter,
  setPackCardsAC,
} from '../actions/pack-action';
import { AppThunk } from '../store';

import { cardsPackAPI } from 'a1-main/m3-dal/cardspack-api';
import { searchApi } from 'a1-main/m3-dal/search-api';

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
  (_id: string, userId: string): AppThunk =>
  async dispatch => {
    dispatch(setStatusAC(true));
    try {
      const cardsPack = await cardsPackAPI.deleteCardsPack(_id);
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

export const updatePackCardsTC =
  (_id: string, name: string, userId: string): AppThunk =>
  async dispatch => {
    dispatch(setStatusAC(true));
    try {
      const cardsPack = await cardsPackAPI.updatesCardsPack(_id, name);
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
