import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Navigate, NavLink } from 'react-router-dom';

import { Button } from '../../a1-main/m1-ui/components/common/CustomButton/Button';
import { Checkbox } from '../../a1-main/m1-ui/components/common/CustomCheckBox/CheckBox';
import { Input } from '../../a1-main/m1-ui/components/common/CustomInput/Input';
import { AppRootState } from '../../a1-main/m2-bll/store';
import { toAuth } from '../../a1-main/m2-bll/thunks/auth-thunk';
import { LoginCredentialsSendType } from '../../a1-main/m3-dal/types/loginType';
import { EMPTY_STRING, FALSE, PASSWORD, TITLE_EMAIL } from '../../constants/common';
import { PATH } from '../../enums/routes';

import { ReturnComponentType } from 'types/ReturnComponentType';

export const Login = (): ReturnComponentType => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>(EMPTY_STRING);
  const [password, setPassword] = useState<string>(EMPTY_STRING);
  const [rememberMe, setRememberMe] = useState<boolean>(FALSE);
  const loginCredentials: LoginCredentialsSendType = { email, password, rememberMe };
  const AuthUserStatus = useSelector<AppRootState, boolean>(state => state.auth.isAuth);
  const handleSubmit = (): void => {
    dispatch(toAuth(loginCredentials));
  };
  if (AuthUserStatus) return <Navigate to={PATH.PROFILE} />;
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input title={TITLE_EMAIL} onChangeText={setEmail} value={email} type="email" />
        <Input
          title={PASSWORD}
          onChangeText={setPassword}
          value={password}
          type="password"
        />
        <Checkbox onChangeChecked={setRememberMe} checked={rememberMe} type="checkbox">
          Remember me
        </Checkbox>
        <div>
          <Button>Login</Button>
        </div>
      </form>
      <NavLink to={PATH.RECOVERY_PASSWORD}>I forgot password</NavLink>
    </div>
  );
};
