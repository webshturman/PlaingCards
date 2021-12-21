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
  sortCards?: number;
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
