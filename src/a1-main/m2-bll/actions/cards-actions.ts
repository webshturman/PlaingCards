import { cardsResponseType } from 'a1-main/m3-dal/types/cardsType';

export enum CARDS_ACTIONS_TYPE {
  SET_CARDS_DATA = 'PlayingCards/cards/SET_CARDS_DATA',
  SET_CURRENT_CARD_PAGE = 'PlayingCards/cards/SET_CURRENT_CARD_PAGE',
  SORT_CARD_DATA = 'PlayingCards/cards/CURRENT_CARD_PAGE',
}

export const setCardsData = (cardsData: cardsResponseType) =>
  ({
    type: CARDS_ACTIONS_TYPE.SET_CARDS_DATA,
    cardsData,
  } as const);

export const setCurrentCardPage = (page: number) =>
  ({ type: CARDS_ACTIONS_TYPE.SET_CURRENT_CARD_PAGE, page } as const);

export const SortCardData = (sortData: string) =>
  ({ type: CARDS_ACTIONS_TYPE.SORT_CARD_DATA, sortData } as const);

export type CardsActionsType =
  | ReturnType<typeof setCardsData>
  | ReturnType<typeof setCurrentCardPage>
  | ReturnType<typeof SortCardData>;
