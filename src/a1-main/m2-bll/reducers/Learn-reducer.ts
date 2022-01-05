import { cardsType } from '../../m3-dal/types/learnType';
import { LEARN_ACTIONS_TYPE, LearnActionsType } from '../actions/learn-actions';

export type InitialLearnStateType = typeof initialLearnState;

const initialLearnState = {
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

export const LearnReducer = (
  state: InitialLearnStateType = initialLearnState,
  action: LearnActionsType,
): InitialLearnStateType => {
  switch (action.type) {
    case LEARN_ACTIONS_TYPE.SET_CARDS_DATA:
      return {
        ...state,
        cards: action.cardsData.cards,
        packUserId: action.cardsData.packUserId,
        cardsTotalCount: action.cardsData.cardsTotalCount,
      };
    case LEARN_ACTIONS_TYPE.SET_CARDS_ID:
      return { ...state, cardsId: action.cardsId };
    case LEARN_ACTIONS_TYPE.SET_QUESTION_NUMBER:
      return { ...state, questionNumber: action.questionNumber };
    case LEARN_ACTIONS_TYPE.SET_ANSWER_STATUS:
      return { ...state, isShowAnswer: action.answer };
    default:
      return state;
  }
};
