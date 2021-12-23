import { AxiosResponse } from 'axios';

import { instance } from './instance';
import { cardsAddType, cardsRequestType, cardsResponseType } from './types/cardsType';

export const cardsAPI = {
  // getCardsList(PackId: string, page: number) {
  //   return instance.get<cardsRequestType, AxiosResponse<cardsResponseType>>(
  //     `cards/card?cardsPack_id=${PackId}&page=${page}&pageCount=4`,
  //   );
  // },
  getCardsList(cardsData: cardsRequestType) {
    return instance.get<cardsRequestType, AxiosResponse<cardsResponseType>>(
      `cards/card`,
      { params: cardsData },
    );
  },
  addCard(newCard: cardsAddType) {
    return instance.post<cardsAddType, any>(`cards/card`, { card: newCard });
  },
  deleteCard(cardId: string) {
    return instance.delete<string, any>(`cards/card?id=${cardId}`);
  },
  updateCard(_id: string, question: string) {
    return instance.put<{ _id: string; question: string }, any>(`cards/card`, {
      card: { _id, question },
    });
  },
};
