import axios from 'axios';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  // withCredentials:true,
  // headers: {
  //     'API-KEY': 'b8b0c036-4edd-4913-8c7f-79ccaeace603'
  // },
});
