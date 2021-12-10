import React, { FC } from 'react';

import { Header } from './Header';
import { Main } from './Main';

import style from 'styles/App.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const App: FC = (): ReturnComponentType => (
  <div className={style.container}>
    <Header />
    <Main />
  </div>
);
