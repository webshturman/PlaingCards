import React, { FC } from 'react';

import { Main } from './Main';

import style from 'styles/App.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const App: FC = (): ReturnComponentType => (
  <div className={style.App}>
    {/* <Header /> */}
    <Main />
  </div>
);
