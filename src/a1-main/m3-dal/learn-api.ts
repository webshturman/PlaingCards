import { AxiosResponse } from 'axios';

import { instance } from './instance';
import { cardsRequestType, cardsResponseType } from './types/learnType';

export const learnAPI = {
  getCardsList(cardsData: cardsRequestType) {
    return instance.get<cardsRequestType, AxiosResponse<cardsResponseType>>(
      `cards/card`,
      { params: cardsData },
    );
  },
};
