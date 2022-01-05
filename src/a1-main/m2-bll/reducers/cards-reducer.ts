import { cardsType } from '../../m3-dal/types/cardsType';
import { CARDS_ACTIONS_TYPE, CardsActionsType } from '../actions/cards-actions';

const initialCardsState = {
  cards: [] as cardsType[],
  cardsTotalCount: 0,
  maxGrade: 10,
  minGrade: 0,
  page: 1,
  pageCount: 4,
  packUserId: '',
  sortCards: '0updated',
};
export type InitialCardsStateType = typeof initialCardsState;

export const cardsReducer = (
  state: InitialCardsStateType = initialCardsState,
  action: CardsActionsType,
): InitialCardsStateType => {
  switch (action.type) {
    case CARDS_ACTIONS_TYPE.SET_CARDS_DATA:
      return {
        ...state,
        cards: action.cardsData.cards,
        packUserId: action.cardsData.packUserId,
        cardsTotalCount: action.cardsData.cardsTotalCount,
      };
    case CARDS_ACTIONS_TYPE.SET_CURRENT_CARD_PAGE:
      return { ...state, page: action.page };
    case CARDS_ACTIONS_TYPE.SORT_CARD_DATA:
      return { ...state, sortCards: action.sortData };
    default:
      return state;
  }
};
