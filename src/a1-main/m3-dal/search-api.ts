import { AxiosResponse } from 'axios';

import { instance } from 'a1-main/m3-dal/instance';

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
    return instance.get<any, AxiosResponse<any>>(
      // eslint-disable-next-line camelcase
      `cards/pack?packName=${searchRequest}&sortPacks=${sortPacks}&page=${page}&pageCount=${pageCount}&user_id=${user_id}&min=${minFilter}&max=${maxFilter}`,
    );
  },
};

// type searchRequestType = {
//   searchText: string;
//   sortPacks: string;
//   pageCount: number;
//   page: number;
//   // eslint-disable-next-line camelcase
//   user_id?: string;
//   minFilter?: number;
//   maxFilter?: number;
// };
//
// export const searchApi = {
//   searchPacks(searchData: searchRequestType) {
//     return instance.get<any, AxiosResponse<any>>(`cards/pack`, { params: searchData });
//   },
// };
