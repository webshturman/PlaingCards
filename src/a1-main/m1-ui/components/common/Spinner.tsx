import { ReturnComponentType } from '../../../../types/ReturnComponentType';

import preloader from 'assets/images/preloader.svg';
import s from 'styles/App.module.css';

export const Spinner = (): ReturnComponentType => (
  <div>
    <div className={s.preloader}>
      <img src={preloader} alt="" />
    </div>
  </div>
);
