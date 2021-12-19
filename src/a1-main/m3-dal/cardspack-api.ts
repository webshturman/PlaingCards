import { instance } from './instance';

export const cardsPackAPI = {
  readCardsPack() {
    return instance.get<any>(`cards/pack`);
  },
  createCardsPack() {
    return instance.get<any>(`cards/pack`);
  },
  deleteCardsPack() {
    return instance.get<any>(`cards/pack`);
  },
  updatesCardsPack() {
    return instance.get<any>(`cards/pack`);
  },
};
