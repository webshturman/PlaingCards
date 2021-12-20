import { cardsAPI } from '../../m3-dal/cards-api';
import { setCardsData } from '../actions/cards-actions';
import { AppThunk } from '../store';

export const getCards =
  (PackId: string): AppThunk =>
  async dispatch => {
    try {
      // eslint-disable-next-line camelcase
      const response = await cardsAPI.getCardsList(PackId);
      dispatch(setCardsData(response.data.cards));
    } catch (error: any) {
      console.log(error);
    }
  };
