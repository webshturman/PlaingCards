import { AxiosResponse } from 'axios';

import { instance } from './instance';
import { cardsPacksRequestType, cardsPacksResponseType } from './types/cardsType';

export const cardsPackAPI = {
  // eslint-disable-next-line camelcase
  readCardsPack(sortPacks: string, pageCount?: number, page?: number, user_id?: string) {
    return instance.get<cardsPacksRequestType, AxiosResponse<cardsPacksResponseType>>(
      `cards/pack`,
      {
        params: { sortPacks, pageCount, page, user_id },
      },
    );
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
