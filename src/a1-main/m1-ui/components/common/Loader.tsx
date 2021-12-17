import { useSelector } from 'react-redux';

import { ReturnComponentType } from '../../../../types/ReturnComponentType';
import { AppRootState } from '../../../m2-bll/store';

import preloader from 'assets/images/preloader.svg';
import s from 'styles/App.module.css';

export const Loader = (): ReturnComponentType => (
  <div>
    <div className={s.preloader}>
      <img src={preloader} alt="" />
    </div>
  </div>
);
