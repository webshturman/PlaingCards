import { AxiosResponse } from 'axios';

import { instance } from './instance';
import {
  cardRateRequestType,
  cardRateResponseType,
  cardsRequestType,
  cardsResponseType,
} from './types/learnType';

export const learnAPI = {
  getCardsList(cardsData: cardsRequestType) {
    return instance.get<cardsRequestType, AxiosResponse<cardsResponseType>>(
      `cards/card`,
      { params: cardsData },
    );
  },

  sendCardRate(grade: number, cardId: string) {
    return instance.put<cardRateRequestType, AxiosResponse<cardRateResponseType>>(
      `cards/grade`,
      { grade, card_id: cardId },
    );
  },
};
