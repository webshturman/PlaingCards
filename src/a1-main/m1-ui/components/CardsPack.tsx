import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { ZERO } from '../../../constants/common';
import { PATH } from '../../../enums/routes';
import { setMaxFilter, setMinFilter } from '../../m2-bll/actions/pack-action';
import { AppRootState } from '../../m2-bll/store';

import { ReturnComponentType } from 'types/ReturnComponentType';

export const CardsPack = (): ReturnComponentType => {
  const dispatch = useDispatch();
  const min = useSelector<AppRootState, number>(state => state.cardspack.minCardsCount);
  const max = useSelector<AppRootState, number>(state => state.cardspack.maxCardsCount);
  useEffect(() => {
    if (max !== ZERO) {
      dispatch(setMinFilter(min));
      dispatch(setMaxFilter(max));
    }
  });

  const AuthUserStatus = useSelector<AppRootState, boolean>(state => state.auth.isAuth);
  if (!AuthUserStatus) return <Navigate to={PATH.LOGIN_FORM} />;
  return (
    <div>
      <Outlet />
    </div>
  );
};
