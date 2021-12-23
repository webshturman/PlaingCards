import { AxiosResponse } from 'axios';

import { instance } from 'a1-main/m3-dal/instance';

export const searchApi = {
  searchPacks(
    searchRequest: string,
    sortPacks: string,
    pageCount: number,
    page: number,
    minFilter?: number,
    maxFilter?: number,
  ) {
    return instance.get<any, AxiosResponse<any>>(
      `cards/pack?packName=${searchRequest}&sortPacks=${sortPacks}&page=${page}&pageCount=${pageCount}&min=${minFilter}&max=${maxFilter}`,
    );
  },
};
