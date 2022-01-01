import { setStatusAC } from '../actions/app-actions';
import {
  setCardsPackTotalCountAC,
  setPackCardsAC,
  setSearchText,
} from '../actions/pack-action';
import { AppThunk } from '../store';

import { searchApi } from 'a1-main/m3-dal/search-api';

export const searchPacks =
  (
    searchRequest: string,
    sortPacks: string,
    pageCount: number,
    page: number,
    // eslint-disable-next-line camelcase
    user_id?: string,
    minFilter?: number,
    maxFilter?: number,
  ): AppThunk =>
  async dispatch => {
    dispatch(setStatusAC(true));
    try {
      const response = await searchApi.searchPacks(
        searchRequest,
        sortPacks,
        pageCount,
        page,
        // eslint-disable-next-line camelcase
        user_id,
        minFilter,
        maxFilter,
      );
      dispatch(setSearchText(searchRequest));
      dispatch(setCardsPackTotalCountAC(response.data.cardPacksTotalCount));
      dispatch(setPackCardsAC(response.data.cardPacks));
    } catch (error) {
      console.log(`Error search: ${error}`);
    } finally {
      dispatch(setStatusAC(false));
    }
  };
