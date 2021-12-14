import { useSelector } from 'react-redux';

import { ReturnComponentType } from '../../../../types/ReturnComponentType';
import { AppRootState } from '../../../m2-bll/store';

export const ErrorAll = (): ReturnComponentType => {
  const error = useSelector<AppRootState, boolean>(state => state.app.error);
  const textError = useSelector<AppRootState, string>(state => state.app.textError);
  return (
    <div>
      {error && (
        <div style={{ backgroundColor: 'red', padding: '10px' }}>
          <h1>Произошла ошибка</h1>
          <h2>{textError}</h2>
        </div>
      )}
    </div>
  );
};
