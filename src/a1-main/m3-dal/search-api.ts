import { AxiosResponse } from 'axios';

import { cardsPacksRequestType, cardsPacksResponseType } from './types/cardsType';

import { instance } from 'a1-main/m3-dal/instance';
import { EMPTY_STRING } from 'constants/common';

export const searchApi = {
  searchPacks(
    searchRequest: string,
    sortPacks: string,
    pageCount: number,
    page: number,
    // eslint-disable-next-line camelcase
    user_id?: string,
    minFilter?: number,
    maxFilter?: number,
  ) {
    return instance.get<cardsPacksRequestType, AxiosResponse<cardsPacksResponseType>>(
      // eslint-disable-next-line camelcase
      `cards/pack?packName=${searchRequest}&sortPacks=${sortPacks}&page=${page}&pageCount=${pageCount}${
        // eslint-disable-next-line camelcase
        user_id !== undefined && user_id !== EMPTY_STRING ? `&user_id=${user_id}` : ''
      }${minFilter !== undefined ? `&min=${minFilter}` : ''}${
        maxFilter !== undefined ? `&max=${maxFilter}` : ''
      }`,
    );
  },
};
