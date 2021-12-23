import { AxiosResponse } from 'axios';

import { instance } from 'a1-main/m3-dal/instance';

export const searchApi = {
  searchPacks(searchRequest: string, pageCount: number, page: number) {
    return instance.get<any, AxiosResponse<any>>(
      `cards/pack?packName=${searchRequest}&page=${page}&pageCount=${pageCount}`,
    );
  },
};
