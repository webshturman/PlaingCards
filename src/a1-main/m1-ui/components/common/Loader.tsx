import { useSelector } from 'react-redux';

import { ReturnComponentType } from '../../../../types/ReturnComponentType';
import { AppRootState } from '../../../m2-bll/store';
import preloader from '../../circles.svg';

export const Loader = (): ReturnComponentType => {
  const loader = useSelector<AppRootState, boolean>(state => state.app.isFetching);
  console.log(loader);
  return (
    <div>
      {loader && (
        <div style={{ backgroundColor: 'blue', padding: '10px' }}>
          <h1>loader</h1>
          <img src={preloader} alt="" />
        </div>
      )}
    </div>
  );
};
