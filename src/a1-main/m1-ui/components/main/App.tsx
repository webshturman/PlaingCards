import React, { FC } from 'react';

import { ErrorAll } from '../common/ErrorAll';
import { Loader } from '../common/Loader';

import { Header } from './Header';
import { Main } from './Main';

import style from 'styles/App.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const App: FC = (): ReturnComponentType => (
  <div className={style.container}>
    <Loader />
    <ErrorAll />
    <Header />
    <Main />
  </div>
);
