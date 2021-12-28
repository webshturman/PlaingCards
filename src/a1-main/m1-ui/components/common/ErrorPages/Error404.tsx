import { NavLink } from 'react-router-dom';

import { PATH } from 'enums/routes';
import style from 'styles/ErrorPage.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const Error404 = (): ReturnComponentType => (
  <div className={style.errorPage}>
    <div className={style.errorTitle}>
      <h1>
        4<span className={style.errorImg} />4
      </h1>
    </div>
    <div className={style.errorSign}>OOPS! PAGE NOT BE FOUND</div>
    <div>
      <p>
        Sorry but the page you are looking for does not exist, have been removed, name
        changed or is temporarily unavailable
      </p>
    </div>
    <div>
      <NavLink to={PATH.PROFILE} className={style.errorButton}>
        Back to homepage
      </NavLink>
    </div>
  </div>
);
