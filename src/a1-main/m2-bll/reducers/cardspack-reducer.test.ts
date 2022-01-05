import {
  EMPTY_STRING,
  FOUR,
  ONE,
  TEST_ONE_HUNDRED_THREE,
  TWO,
  ZERO,
} from '../../../constants/common';
import {
  setCardsPackTotalCountAC,
  setCurrentPageAC,
  setMaxCardsCount,
  setMaxFilter,
  setMinCardsCount,
  setMinFilter,
  setPackCardsAC,
  setSearchText,
  SortPackCardsAC,
} from '../actions/pack-action';

import {
  cardsPackReducer,
  InitialPackCardStateStateType,
  PacksType,
} from './cardspack-reducer';

test('packs must be received', () => {
  const startState: InitialPackCardStateStateType = {
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

  const arrayPack = [
    {
      cardsCount: 3,
      created: 'writer',
      grade: 0,
      more_id: '1',
      name: 'name',
      path: 'path',
      private: false,
      rating: 0,
      shots: 0,
      type: 'type',
      updated: '11.11',
      user_id: '1',
      user_name: 'name',
      __v: 0,
      _id: '1',
    },
    {
      cardsCount: 4,
      created: 'writer',
      grade: 0,
      more_id: '2',
      name: 'name',
      path: 'path',
      private: false,
      rating: 0,
      shots: 0,
      type: 'type',
      updated: '11.11',
      user_id: '2',
      user_name: 'name',
      __v: 0,
      _id: '2',
    },
  ];

  const action = setPackCardsAC(arrayPack);

  const endState = cardsPackReducer(startState, action);

  expect(endState.cardPacks.length).toBe(TWO);
  expect(endState.cardPacks[ZERO]._id).toBe('1');
});
test('total count must be correct', () => {
  const startState: InitialPackCardStateStateType = {
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

  const action = setCardsPackTotalCountAC(FOUR);

  const endState = cardsPackReducer(startState, action);

  expect(endState.cardPacksTotalCount).toBe(FOUR);
  expect(endState.page).toBe(ONE);
});
test('the sort data must be correct', () => {
  const startState: InitialPackCardStateStateType = {
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
  const action = SortPackCardsAC('1updated');

  const endState = cardsPackReducer(startState, action);

  expect(endState.sortPacks).toBe('1updated');
  expect(endState.page).toBe(ONE);
});
test('current page should be correct', () => {
  const startState: InitialPackCardStateStateType = {
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
  const action = setCurrentPageAC(FOUR);
  const endState = cardsPackReducer(startState, action);

  expect(endState.page).toBe(FOUR);
  expect(endState.searchText).toBe(EMPTY_STRING);
});
test('search text should be correct', () => {
  const startState: InitialPackCardStateStateType = {
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
  const action = setSearchText('aaaa');
  const endState = cardsPackReducer(startState, action);

  expect(startState.searchText).toBe('');
  expect(endState.searchText).toBe('aaaa');
});
test('set the maximum amount cards', () => {
  const startState: InitialPackCardStateStateType = {
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
  const action = setMaxCardsCount(TEST_ONE_HUNDRED_THREE);
  const endState = cardsPackReducer(startState, action);

  expect(endState.maxCardsCount).toBe(TEST_ONE_HUNDRED_THREE);
  expect(endState.minCardsCount).toBe(ZERO);
  expect(endState === startState).toBeFalsy();
});
test('set the minimum amount cards', () => {
  const startState: InitialPackCardStateStateType = {
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
  const action = setMinCardsCount(FOUR);
  const endState = cardsPackReducer(startState, action);

  expect(endState.minCardsCount).toBe(FOUR);
  expect(endState.searchText).toBe(EMPTY_STRING);
});
test('set the maximum filter amount cards', () => {
  const startState: InitialPackCardStateStateType = {
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
  const action = setMaxFilter(FOUR);
  const endState = cardsPackReducer(startState, action);

  expect(endState.maxFilter).toBe(FOUR);
  expect(endState.searchText).toBe(EMPTY_STRING);
});
test('set the minimum filter amount cards', () => {
  const startState: InitialPackCardStateStateType = {
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
  const action = setMinFilter(ONE);
  const endState = cardsPackReducer(startState, action);

  expect(endState.minFilter).toBe(ONE);
  expect(endState !== startState).toBeTruthy();
});
