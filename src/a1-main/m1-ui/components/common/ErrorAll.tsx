import { useSelector } from 'react-redux';

import { ReturnComponentType } from '../../../../types/ReturnComponentType';
import { AppRootState } from '../../../m2-bll/store';

import s from 'styles/App.module.css';

export const ErrorAll = (): ReturnComponentType => {
  const error = useSelector<AppRootState, boolean>(state => state.app.error);
  const textError = useSelector<AppRootState, string>(state => state.app.textError);
  return (
    <div>
      {error && (
        <div className={s.errorAll}>
          <h1>Произошла ошибка</h1>
          <h2>{textError}</h2>
        </div>
      )}
    </div>
  );
};
