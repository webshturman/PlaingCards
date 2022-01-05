import { FOUR, ONE, TWO, ZERO_LENGTH } from '../../../constants/common';
import { cardsType } from '../../m3-dal/types/cardsType';
import { setCardsData, setCurrentCardPage, SortCardData } from '../actions/cards-actions';

import { cardsReducer, InitialCardsStateType } from './cards-reducer';

test('data from server on cards must be installed', () => {
  const startState: InitialCardsStateType = {
    cards: [] as cardsType[],
    cardsTotalCount: 0,
    maxGrade: 10,
    minGrade: 0,
    page: 1,
    pageCount: 4,
    packUserId: '',
    sortCards: '0updated',
  };
  const dataServer = {
    cards: [
      {
        answer: 'js',
        question: 'do you learn?',
        cardsPack_id: '1',
        grade: 0,
        rating: 0,
        shots: 0,
        type: 'type',
        user_id: '1',
        created: 'name',
        updated: '11.11',
        __v: 1,
        _id: '1',
      },
      {
        answer: 'HTML',
        question: 'do you learn?',
        cardsPack_id: '2',
        grade: 0,
        rating: 0,
        shots: 0,
        type: 'type',
        user_id: '2',
        created: 'name',
        updated: '11.11',
        __v: 2,
        _id: '2',
      },
    ],
    cardsTotalCount: 0,
    maxGrade: 10,
    minGrade: 0,
    page: 1,
    pageCount: 4,
    packUserId: '',
  };

  const action = setCardsData(dataServer);

  const endState = cardsReducer(startState, action);

  expect(endState.cards.length).toBe(TWO);
  expect(endState.cards[ZERO_LENGTH].answer).toBe('js');
  expect(endState.pageCount).toBe(FOUR);
});
test('the page number must be correct', () => {
  const startState: InitialCardsStateType = {
    cards: [] as cardsType[],
    cardsTotalCount: 0,
    maxGrade: 10,
    minGrade: 0,
    page: 1,
    pageCount: 4,
    packUserId: '',
    sortCards: '0updated',
  };

  const action = setCurrentCardPage(FOUR);

  const endState = cardsReducer(startState, action);

  expect(endState.page).toBe(FOUR);
  expect(endState.pageCount).toBe(FOUR);
});
test('the sort data must be correct', () => {
  const startState: InitialCardsStateType = {
    cards: [] as cardsType[],
    cardsTotalCount: 0,
    maxGrade: 10,
    minGrade: 0,
    page: 1,
    pageCount: 4,
    packUserId: '',
    sortCards: '0updated',
  };

  const action = SortCardData('1updated');

  const endState = cardsReducer(startState, action);

  expect(endState.sortCards).toBe('1updated');
  expect(endState.page).toBe(ONE);
});
