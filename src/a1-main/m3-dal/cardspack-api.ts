import { instance } from './instance';

export const cardsPackAPI = {
  readCardsPack(sortPacks: string, pageCount?: number, page?: number) {
    return instance.get<any>(`cards/pack`, {
      params: { sortPacks, pageCount, page },
    });
  },
  createCardsPack(newPack: string) {
    return instance.post<any>(`cards/pack`, { cardsPack: { name: newPack } });
  },
  deleteCardsPack(packId: string) {
    return instance.delete<any>(`cards/pack/?id=${packId}`);
  },
  updatesCardsPack(_id: string, newName: string) {
    return instance.put<any>(`cards/pack`, { cardsPack: { _id, name: newName } });
  },
};
