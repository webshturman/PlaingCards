import { AxiosResponse } from 'axios';

import { instance } from './instance';
import { cardsAddType, cardsRequestType, cardsResponseType } from './types/cardsType';

export const cardsAPI = {
  getCardsList(PackId: string) {
    return instance.get<cardsRequestType, AxiosResponse<cardsResponseType>>(
      `cards/card?cardsPack_id=${PackId}&pageCount=10`,
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
