import { instance } from './instance';

export const cardsAPI = {
  getCardsList(PackId: string) {
    return instance.get<any, any>(`cards/card?cardsPack_id=${PackId}&pageCount=1000`);
  },
};
