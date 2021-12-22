import { cardsResponseType } from 'a1-main/m3-dal/types/cardsType';

export enum CARDS_ACTIONS_TYPE {
  SET_CARDS_DATA = 'PlayingCards/cards/SET_CARDS_DATA',
  SET_CARDS_TOTAL_COUNT = 'PlayingCards/cards/SET_CARDS_TOTAL_COUNT',
}
// export const setCardsData = (cards: cardsType[]) =>
//   ({
//     type: CARDS_ACTIONS_TYPE.SET_CARDS_DATA,
//     cards,
//   } as const);

export const setCardsData = (cardsData: cardsResponseType) =>
  ({
    type: CARDS_ACTIONS_TYPE.SET_CARDS_DATA,
    cardsData,
  } as const);

// export const setTotalCardsCount = (cardsCount: number) =>
//   ({
//     type: CARDS_ACTIONS_TYPE.SET_CARDS_TOTAL_COUNT,
//     cardsCount,
//   } as const);

export type CardsActionsType = ReturnType<typeof setCardsData>;
