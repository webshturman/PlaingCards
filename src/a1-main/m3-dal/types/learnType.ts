export type cardsType = {
  answer?: string;
  question?: string;
  // eslint-disable-next-line camelcase
  cardsPack_id: string;
  grade?: number;
  rating?: number;
  shots?: number;
  type?: string;
  // eslint-disable-next-line camelcase
  user_id?: string;
  created?: string;
  updated?: string;
  __v?: number;
  _id?: string;
};

export type cardsRequestType = {
  cardAnswer?: string;
  cardQuestion?: string;
  // eslint-disable-next-line camelcase
  cardsPack_id: string;
  min?: number;
  max?: number;
  sortCards?: string;
  page?: number;
  pageCount?: number;
};

export type cardsResponseType = {
  cards: cardsType[];
  cardsTotalCount: number;
  maxGrade: number;
  minGrade: number;
  page: number;
  pageCount: number;
  packUserId: string;
};

export type cardsAddType = cardsType & {
  answerImg?: string;
  questionImg?: string;
  questionVideo?: string;
  answerVideo?: string;
};

export type cardsUpdateType = {
  _id: string;
  answer?: string;
  question?: string;
};

export type cardRateRequestType = {
  grade: number;
  cardId: string;
};

export type cardRateResponseType = {
  _id: string;
  // eslint-disable-next-line camelcase
  cardsPack_id: string;
  // eslint-disable-next-line camelcase
  card_id: string;
  // eslint-disable-next-line camelcase
  user_id: string;
  grade: number;
  shots: number;
};
