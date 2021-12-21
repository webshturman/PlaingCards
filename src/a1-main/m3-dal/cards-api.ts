import { AxiosResponse } from 'axios';

import { instance } from './instance';
import { cardsRequestType, cardsResponseType } from './types/cardsType';

export const cardsAPI = {
  getCardsList(PackId: string) {
    return instance.get<cardsRequestType, AxiosResponse<cardsResponseType>>(
      `cards/card?cardsPack_id=${PackId}&pageCount=1000`,
    );
  },
};
