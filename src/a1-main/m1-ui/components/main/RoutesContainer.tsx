import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { Login } from '../../../../a2-features/f1/Login';
import { CardsPack } from '../CardsPack';
import { CardsTable } from '../CardsTable';
import { Error404 } from '../common/Error404';
import { LoginForm } from '../common/LoginForm';
import { Learn } from '../Learn';
import { PacksCardsTable } from '../PackCardsTable';
import { Profile } from '../Profile';
import { TestComponent } from '../TestComponent';

import { Register } from 'a2-features/f2/Register';
import { NewPassword } from 'a2-features/f3/NewPassword';
import { RecoveryPassword } from 'a2-features/f3/RecoveryPassword';
import { PATH } from 'enums/routes';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const RoutesContainer = (): ReturnComponentType => (
  <div>
    <Routes>
      <Route path={PATH.LOGIN_FORM} element={<LoginForm />}>
        <Route index element={<Login />} />
        <Route path={PATH.REGISTER} element={<Register />} />
        <Route path={PATH.RECOVERY_PASSWORD} element={<RecoveryPassword />} />
        <Route path={PATH.NEW_PASSWORD} element={<NewPassword />}>
          <Route path=":token" element={<NewPassword />} />
        </Route>
      </Route>
      <Route path={PATH.ERROR} element={<Error404 />} />
      <Route path={PATH.WRONG_PAGE} element={<Navigate to={PATH.ERROR} />} />
      <Route path={PATH.TEST_PAGE} element={<TestComponent />} />
      <Route path={PATH.PROFILE} element={<Profile />} />
      <Route path={PATH.CARDS} element={<CardsPack />}>
        <Route index element={<PacksCardsTable />} />
        <Route path={PATH.CARDS_TABLE} element={<CardsTable />} />
        <Route path={PATH.LEARN} element={<Learn />} />
      </Route>
    </Routes>
  </div>
);
