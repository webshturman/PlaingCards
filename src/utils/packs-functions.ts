import { useDispatch } from 'react-redux';

import { SortPackCardsAC } from '../a1-main/m2-bll/actions/pack-action';
import {
  createPackCardsTC,
  deletePackCardsTC,
  updatePackCardsTC,
} from '../a1-main/m2-bll/thunks/pack-thunk';

export const packUtils = (): any => {
  const dispatch = useDispatch();

  const addPackCards = (userId: string): void => {
    dispatch(createPackCardsTC('lakdlakfaldkad', userId));
  };
  const sortPackCards = (value: string): void => {
    dispatch(SortPackCardsAC(value));
  };
  const deletePack = (id: string): void => {
    dispatch(deletePackCardsTC(id));
  };
  const updatePack = (id: string, title: string): void => {
    dispatch(updatePackCardsTC(id, title));
  };
  return [addPackCards, sortPackCards, deletePack, updatePack];
};
