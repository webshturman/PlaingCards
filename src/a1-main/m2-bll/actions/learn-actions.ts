import { cardsResponseType } from 'a1-main/m3-dal/types/learnType';

export enum LEARN_ACTIONS_TYPE {
  SET_CARDS_DATA = 'PlayingCards/learn/SET-CARDS-DATA',
  SET_CARDS_ID = 'PlayingCards/learn/SET-CARDS-ID',
  SET_QUESTION_NUMBER = 'PlayingCards/learn/SET-QUESTION-NUMBER',
  SET_ANSWER_STATUS = 'PlayingCards/learn/SET-ANSWER-STATUS',
}

export const setCardsData = (cardsData: cardsResponseType) =>
  ({
    type: LEARN_ACTIONS_TYPE.SET_CARDS_DATA,
    cardsData,
  } as const);

export const setCardsId = (cardsId: Array<string>) =>
  ({ type: LEARN_ACTIONS_TYPE.SET_CARDS_ID, cardsId } as const);

export const setQuestionNumber = (questionNumber: number) =>
  ({ type: LEARN_ACTIONS_TYPE.SET_QUESTION_NUMBER, questionNumber } as const);

export const setAnswerStatus = (answer: boolean) =>
  ({ type: LEARN_ACTIONS_TYPE.SET_ANSWER_STATUS, answer } as const);

export type LearnActionsType =
  | ReturnType<typeof setCardsData>
  | ReturnType<typeof setCardsId>
  | ReturnType<typeof setQuestionNumber>
  | ReturnType<typeof setAnswerStatus>;
