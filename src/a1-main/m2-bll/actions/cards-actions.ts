import { cardsType } from 'a1-main/m3-dal/types/cardsType';

export enum CARDS_ACTIONS_TYPE {
  SET_CARDS_DATA = 'PlayingCards/cards/SET_CARDS_DATA',
}

export const setCardsData = (cards: cardsType[]) =>
  ({
    type: CARDS_ACTIONS_TYPE.SET_CARDS_DATA,
    cards,
  } as const);

export type CardsActionsType = ReturnType<typeof setCardsData>;
