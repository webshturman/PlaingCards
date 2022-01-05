import { FOUR, ONE, TWO, ZERO } from '../../../constants/common';
import { cardsType } from '../../m3-dal/types/learnType';
import {
  setAnswerStatus,
  setCardsData,
  setCardsId,
  setQuestionNumber,
} from '../actions/learn-actions';

import { InitialLearnStateType, LearnReducer } from './Learn-reducer';

test('data chould be received', () => {
  const startState: InitialLearnStateType = {
    cards: [] as cardsType[],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 1,
    pageCount: 0,
    packUserId: '',
    sortCards: '0updated',
    cardsId: [] as string[],
    questionNumber: 0,
    question: '',
    isShowAnswer: false,
  };
  const responseData = {
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
    cardsTotalCount: 123,
    maxGrade: 3,
    minGrade: 0,
    page: 4,
    pageCount: 4,
    packUserId: '2a56f',
  };
  const action = setCardsData(responseData);

  const endState = LearnReducer(startState, action);

  expect(endState.cards.length).toBe(TWO);
  expect(endState.cards[ZERO]._id).toBe('1');
  expect(endState.packUserId).toBe('2a56f');
});
test('id cards chould be set', () => {
  const startState: InitialLearnStateType = {
    cards: [] as cardsType[],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 1,
    pageCount: 0,
    packUserId: '',
    sortCards: '0updated',
    cardsId: [] as string[],
    questionNumber: 0,
    question: '',
    isShowAnswer: false,
  };
  const arrayIdCards = ['1', '2', '3', '4'];
  const action = setCardsId(arrayIdCards);
  const endState = LearnReducer(startState, action);

  expect(endState.cardsId.length).toBe(FOUR);
  expect(endState.cardsId[ZERO]).toBe('1');
  expect(endState === startState).toBeFalsy();
});
test('question number should be changed', () => {
  const startState: InitialLearnStateType = {
    cards: [] as cardsType[],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 1,
    pageCount: 0,
    packUserId: '',
    sortCards: '0updated',
    cardsId: [] as string[],
    questionNumber: 0,
    question: '',
    isShowAnswer: false,
  };

  const action = setQuestionNumber(ONE);

  const endState = LearnReducer(startState, action);

  expect(endState.questionNumber).toBe(ONE);
  expect(endState === startState).toBeFalsy();
});
test('status answer should be changed', () => {
  const startState: InitialLearnStateType = {
    cards: [] as cardsType[],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 1,
    pageCount: 0,
    packUserId: '',
    sortCards: '0updated',
    cardsId: [] as string[],
    questionNumber: 0,
    question: '',
    isShowAnswer: false,
  };

  const action = setAnswerStatus(true);

  const endState = LearnReducer(startState, action);

  expect(endState.isShowAnswer).toBe(true);
  expect(endState === startState).toBeFalsy();
});
