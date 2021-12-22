import { cardsType } from '../../m3-dal/types/cardsType';
import { CARDS_ACTIONS_TYPE, CardsActionsType } from '../actions/cards-actions';

const initialCardsState = {
  cards: [] as cardsType[],
  cardsTotalCount: 0,
  maxGrade: 10,
  minGrade: 0,
  page: 1,
  pageCount: 10,
  packUserId: '',
  sortCards: '0updated',
};
type initialCardsStateType = typeof initialCardsState;
export const cardsReducer = (
  state: initialCardsStateType = initialCardsState,
  action: CardsActionsType,
): initialCardsStateType => {
  switch (action.type) {
    case CARDS_ACTIONS_TYPE.SET_CARDS_DATA:
      return {
        ...state,
        cards: action.cardsData.cards,
        packUserId: action.cardsData.packUserId,
        cardsTotalCount: action.cardsData.cardsTotalCount,
      };
    // case CARDS_ACTIONS_TYPE.SET_CARDS_TOTAL_COUNT:
    //   return { ...state, cardsTotalCount: action.cardsCount };
    default:
      return state;
  }
};
