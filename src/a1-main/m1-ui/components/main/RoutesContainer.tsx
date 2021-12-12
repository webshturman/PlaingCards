import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { Error404 } from 'a1-main/m1-ui/components/common/Error404';
import { Profile } from 'a1-main/m1-ui/components/Profile';
import { TestComponent } from 'a1-main/m1-ui/components/TestComponent';
import { Login } from 'a2-features/f1/Login';
import { Register } from 'a2-features/f2/Register';
import { RecoveryPassword } from 'a2-features/f3/RecoveryPassword';
import { NewPassword } from 'a2-features/NewPassword';
import { PATH } from 'enums/routes';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const RoutesContainer = (): ReturnComponentType => (
  <div>
    <Routes>
      <Route path={PATH.PROFILE} element={<Profile />} />
      <Route path={PATH.REGISTER} element={<Register />} />
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.RECOVERY_PASSWORD} element={<RecoveryPassword />} />
      <Route path={PATH.NEW_PASSWORD} element={<NewPassword />}>
        <Route path=":token" element={<NewPassword />} />
      </Route>
      <Route path={PATH.ERROR} element={<Error404 />} />
      <Route path={PATH.WRONG_PAGE} element={<Navigate to={PATH.ERROR} />} />
      <Route path={PATH.TEST_PAGE} element={<TestComponent />} />
    </Routes>
  </div>
);
