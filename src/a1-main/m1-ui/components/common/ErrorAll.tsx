import { useDispatch, useSelector } from 'react-redux';

import { ReturnComponentType } from '../../../../types/ReturnComponentType';
import { setErrorMessageAC } from '../../../m2-bll/actions/app-actions';
import { AppRootState } from '../../../m2-bll/store';

import s from 'styles/App.module.css';

export const ErrorAll = (): ReturnComponentType => {
  const error = useSelector<AppRootState, boolean>(state => state.app.error);
  const textError = useSelector<AppRootState, string>(state => state.app.textError);
  const dispatch = useDispatch();
  return (
    <div>
      {error && (
        <div className={s.errorAll}>
          <button
            type="button"
            onClick={() => {
              dispatch(setErrorMessageAC(false, ''));
            }}
          >
            x
          </button>
          <h1>Произошла ошибка</h1>
          <h2>{textError}</h2>
        </div>
      )}
    </div>
  );
};
