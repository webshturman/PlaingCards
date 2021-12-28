import { ReturnComponentType } from '../../../../types/ReturnComponentType';

import threedots from 'assets/images/threedots.svg';
import s from 'styles/App.module.css';

export const Loader = (): ReturnComponentType => (
  <div>
    <div className={s.preloader}>
      <img src={threedots} alt="" />
    </div>
  </div>
);