import { searchApi } from '../../m3-dal/search-api';
import { setStatusAC } from '../actions/app-actions';
import {
  setCardsPackTotalCountAC,
  setCurrentPageAC,
  setPackCardsAC,
  setSearchText,
} from '../reducers/cardspack-reducer';
import { AppThunk } from '../store';

export const searchPacks =
  (searchRequest: string): AppThunk =>
  async (dispatch, getState) => {
    const one = 1;
    const { pageCount, page } = getState().cardspack;
    dispatch(setStatusAC(true));
    try {
      const response = await searchApi.searchPacks(searchRequest, pageCount, page);
      dispatch(setCurrentPageAC(one));
      dispatch(setSearchText(searchRequest));
      dispatch(setPackCardsAC(response.data.cardPacks));
      dispatch(setCardsPackTotalCountAC(response.data.cardPacksTotalCount));
    } catch (error) {
      console.log(`Error search: ${error}`);
    } finally {
      dispatch(setStatusAC(false));
    }
  };
