import { ACTIONS_TYPE_CARDS_PACK, CardsPackActionType } from '../actions/pack-action';

export type PacksType = {
  cardsCount: number;
  created: string;
  grade: number;
  // eslint-disable-next-line camelcase
  more_id: string;
  name: string;
  path: string;
  private: boolean;
  rating: number;
  shots: number;
  type: string;
  updated: string;
  // eslint-disable-next-line camelcase
  user_id: string;
  // eslint-disable-next-line camelcase
  user_name: string;
  __v: number;
  _id: string;
};

const initialPackCardState = {
  cardPacks: [] as Array<PacksType>,
  cardPacksTotalCount: 0,
  maxCardsCount: 0,
  minCardsCount: 0,
  page: 1,
  pageCount: 18,
  portionSize: 10,
  token: '',
  tokenDeathTime: 0,
  sortPacks: '0updated',
  searchText: '',
  minFilter: 0,
  maxFilter: 50,
};

export type InitialPackCardStateStateType = typeof initialPackCardState;

export const cardsPackReducer = (
  state: InitialPackCardStateStateType = initialPackCardState,
  action: CardsPackActionType,
): InitialPackCardStateStateType => {
  switch (action.type) {
    case ACTIONS_TYPE_CARDS_PACK.GET_CARDS_PACK_DATA:
      return { ...state, cardPacks: action.cardPacks };
    case ACTIONS_TYPE_CARDS_PACK.SORT_CARDS_PACK_DATA:
      return { ...state, sortPacks: action.sortValue };
    case ACTIONS_TYPE_CARDS_PACK.SET_CURRENT_PAGE:
      return { ...state, page: action.page };
    case ACTIONS_TYPE_CARDS_PACK.SET_CARD_PACKS_TOTAL_COUNT:
      return { ...state, cardPacksTotalCount: action.cardPacksTotalCount };
    case ACTIONS_TYPE_CARDS_PACK.SET_SEARCH_TEXT:
      return { ...state, searchText: action.searchText };
    case ACTIONS_TYPE_CARDS_PACK.SET_MIN_CARDS_COUNT:
      return { ...state, minCardsCount: action.minCardsCount };
    case ACTIONS_TYPE_CARDS_PACK.SET_MAX_CARDS_COUNT:
      return { ...state, maxCardsCount: action.maxCardsCount };
    case ACTIONS_TYPE_CARDS_PACK.SET_MIN_FILTER:
      return { ...state, minFilter: action.min };
    case ACTIONS_TYPE_CARDS_PACK.SET_MAX_FILTER:
      return { ...state, maxFilter: action.max };
    default:
      return state;
  }
};
