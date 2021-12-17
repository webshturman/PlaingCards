import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Navigate, NavLink } from 'react-router-dom';

import { toggleIsFetching } from '../../a1-main/m2-bll/actions/auth-actions';

import { Button } from 'a1-main/m1-ui/components/common/CustomButton/Button';
import { Checkbox } from 'a1-main/m1-ui/components/common/CustomCheckBox/CheckBox';
import { Input } from 'a1-main/m1-ui/components/common/CustomInput/Input';
import { AppRootState } from 'a1-main/m2-bll/store';
import { toAuth } from 'a1-main/m2-bll/thunks/auth-thunk';
import { LoginCredentialsSendType } from 'a1-main/m3-dal/types/loginType';
import {
  emailValidator,
  EMPTY_STRING,
  PASSWORD,
  TITLE_EMAIL,
  ZERO_LENGTH,
} from 'constants/common';
import { PATH } from 'enums/routes';
import style from 'styles/Login.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const Login = (): ReturnComponentType => {
  const errorEmailValidation = 'Email is incorrect';
  const errorPasswordValidation = 'Password is required';
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>(EMPTY_STRING);
  const [emailError, setEmailError] = useState<string>(EMPTY_STRING);
  const [password, setPassword] = useState<string>(EMPTY_STRING);
  const [passwordError, setPasswordError] = useState<string>(EMPTY_STRING);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const loginCredentials: LoginCredentialsSendType = { email, password, rememberMe };
  const AuthUserStatus = useSelector<AppRootState, boolean>(state => state.auth.isAuth);
  const isFetching = useSelector<AppRootState, boolean>(state => state.app.isFetching);
  const handleEmailValueChange = (emailValue: string): void => {
    setEmail(emailValue);
    if (emailError) {
      setEmailError(EMPTY_STRING);
    }
  };
  const handlePasswordValueChange = (passwordValue: string): void => {
    setPassword(passwordValue);
    if (passwordError) {
      setPasswordError(EMPTY_STRING);
    }
  };

  const handleSubmit = (): void => {
    if (email.match(emailValidator)) {
      setEmailError(EMPTY_STRING);
      dispatch(toAuth(loginCredentials));
      return;
    }
    setEmailError(errorEmailValidation);
    if (password.length === ZERO_LENGTH) {
      setPasswordError(errorPasswordValidation);
      return;
    }
    dispatch(toggleIsFetching(false));
  };
  if (AuthUserStatus) {
    return <Navigate to={PATH.PROFILE} />;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          title={TITLE_EMAIL}
          onChangeText={(currentEmailValue: string) =>
            handleEmailValueChange(currentEmailValue)
          }
          value={email}
          type="email"
        />
        {emailError && (
          <div>
            <span className={style.errorText}>{emailError}</span>
          </div>
        )}
        <Input
          title={PASSWORD}
          onChangeText={(currentPasswordValue: string) =>
            handlePasswordValueChange(currentPasswordValue)
          }
          value={password}
          type="password"
        />
        {passwordError && (
          <div>
            <span className={style.errorText}>{passwordError}</span>
          </div>
        )}
        <Checkbox onChangeChecked={setRememberMe} checked={rememberMe} type="checkbox">
          Remember me
        </Checkbox>
        <div className={style.forgotblock}>
          <NavLink to={PATH.RECOVERY_PASSWORD} className={style.forgotPassword}>
            I forgot password
          </NavLink>
        </div>
        <div>
          <Button condition={isFetching}>Log in</Button>
        </div>
      </form>
      <div className={style.SignUpBlock}>
        <p>Don`t have an account?</p>
        <NavLink to={PATH.REGISTER} className={style.SignUp}>
          SignUp
        </NavLink>
      </div>
    </div>
  );
};
