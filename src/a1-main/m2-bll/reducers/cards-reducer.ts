import { cardsType } from '../../m3-dal/types/cardsType';
import { CARDS_ACTIONS_TYPE, CardsActionsType } from '../actions/cards-actions';

const initialCardsState: cardsType[] = [];

export const cardsReducer = (
  state: cardsType[] = initialCardsState,
  action: CardsActionsType,
): cardsType[] => {
  switch (action.type) {
    case CARDS_ACTIONS_TYPE.SET_CARDS_DATA:
      return [...state, ...action.cards];
    default:
      return state;
  }
};
