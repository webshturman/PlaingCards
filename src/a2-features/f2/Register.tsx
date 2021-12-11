import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { Button } from 'a1-main/m1-ui/components/common/CustomButton/Button';
import { Input } from 'a1-main/m1-ui/components/common/CustomInput/Input';
import { AppRootState } from 'a1-main/m2-bll/store';
import { toSignUp } from 'a1-main/m2-bll/thunks/register-thunk';
import { credentialsType } from 'a1-main/m3-dal/types/registerType';
import { CONFIRM_PASSWORD, EMPTY_STRING, PASSWORD, TITLE_EMAIL } from 'constants/common';
import { PATH } from 'enums/routes';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const Register = (): ReturnComponentType => {
  const [email, setEmail] = useState<string>(EMPTY_STRING);
  const [password, setPassword] = useState<string>(EMPTY_STRING);
  const [passwordConfirm, setPasswordConfirm] = useState<string>(EMPTY_STRING);
  const signUpStatus = useSelector<AppRootState, boolean>(
    state => state.register.signUpStatus,
  );
  const dispatch = useDispatch();

  const credentials: credentialsType = { email, password };
  const handleSubmit = (): void => {
    if (password !== passwordConfirm) {
      console.log('The passwords do not match');
      return;
    }
    dispatch(toSignUp(credentials));
  };
  if (signUpStatus) return <Navigate to={PATH.LOGIN} />;
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          title={TITLE_EMAIL}
          onChangeText={setEmail}
          value={email}
          type="text"
          // onEnter={showAlert}
          // error={error}
          // spanClassName={s.testSpanError}
        />
        <Input
          title={PASSWORD}
          onChangeText={setPassword}
          value={password}
          type="password"
        />
        <Input
          title={CONFIRM_PASSWORD}
          onChangeText={setPasswordConfirm}
          value={passwordConfirm}
          type="password"
        />
        <div>
          <Button>Register</Button>
        </div>
      </form>
    </div>
  );
};
