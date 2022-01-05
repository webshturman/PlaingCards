import { PacksType } from '../reducers/cardspack-reducer';

export enum ACTIONS_TYPE_CARDS_PACK {
  GET_CARDS_PACK_DATA = 'cardspack-reducer/GET-CARDS-PACK-DATA',
  SORT_CARDS_PACK_DATA = 'cardspack-reducer/SORT-CARDS-PACK-DATA',
  SET_CURRENT_PAGE = 'cardspack-reducer/SET-CURRENT-PAGE',
  SET_CARD_PACKS_TOTAL_COUNT = 'cardspack-reducer/SET-CARD-PACKS-TOTAL-COUNT',
  SET_SEARCH_TEXT = 'cardspack-reducer/SET-SEARCH-TEXT',
  SET_MIN_CARDS_COUNT = 'cardspack-reducer/SET-MIN-CARDS-COUNT',
  SET_MAX_CARDS_COUNT = 'cardspack-reducer/SET-MAX-CARDS-COUNT',
  SET_MIN_FILTER = 'cardspack-reducer/SET-MIN-FILTER',
  SET_MAX_FILTER = 'cardspack-reducer/SET-MAX-FILTER',
  // SET_USER_ID = 'cardspack-reducer/SET_USER_ID',
}

export type CardsPackActionType =
  | ReturnType<typeof setPackCardsAC>
  | ReturnType<typeof setCardsPackTotalCountAC>
  | ReturnType<typeof setCurrentPageAC>
  | ReturnType<typeof SortPackCardsAC>
  | ReturnType<typeof setSearchText>
  | ReturnType<typeof setMinCardsCount>
  | ReturnType<typeof setMaxCardsCount>
  | ReturnType<typeof setMinFilter>
  | ReturnType<typeof setMaxFilter>;
// | ReturnType<typeof setUserIdAC>;

export const setMinFilter = (min: number) =>
  ({ type: ACTIONS_TYPE_CARDS_PACK.SET_MIN_FILTER, min } as const);

export const setMaxFilter = (max: number) =>
  ({ type: ACTIONS_TYPE_CARDS_PACK.SET_MAX_FILTER, max } as const);

export const setMinCardsCount = (minCardsCount: number) =>
  ({ type: ACTIONS_TYPE_CARDS_PACK.SET_MIN_CARDS_COUNT, minCardsCount } as const);

export const setMaxCardsCount = (maxCardsCount: number) =>
  ({ type: ACTIONS_TYPE_CARDS_PACK.SET_MAX_CARDS_COUNT, maxCardsCount } as const);

export const setSearchText = (searchText: string) =>
  ({ type: ACTIONS_TYPE_CARDS_PACK.SET_SEARCH_TEXT, searchText } as const);

export const setPackCardsAC = (cardPacks: Array<PacksType>) =>
  ({ type: ACTIONS_TYPE_CARDS_PACK.GET_CARDS_PACK_DATA, cardPacks } as const);

// // eslint-disable-next-line camelcase
// export const setUserIdAC = (user_id: string) =>
//   ({ type: ACTIONS_TYPE_CARDS_PACK.SET_USER_ID, user_id } as const);

export const setCurrentPageAC = (page: number) =>
  ({ type: ACTIONS_TYPE_CARDS_PACK.SET_CURRENT_PAGE, page } as const);

export const setCardsPackTotalCountAC = (cardPacksTotalCount: number) =>
  ({
    type: ACTIONS_TYPE_CARDS_PACK.SET_CARD_PACKS_TOTAL_COUNT,
    cardPacksTotalCount,
  } as const);

export const SortPackCardsAC = (sortValue: string) =>
  ({ type: ACTIONS_TYPE_CARDS_PACK.SORT_CARDS_PACK_DATA, sortValue } as const);
