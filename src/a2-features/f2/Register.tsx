import React, { FormEvent, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Navigate, NavLink } from 'react-router-dom';

import style from '../../styles/Login.module.css';

import { Button } from 'a1-main/m1-ui/components/common/CustomButton/Button';
import { Input } from 'a1-main/m1-ui/components/common/CustomInput/Input';
import { AppRootState } from 'a1-main/m2-bll/store';
import { toSignUp } from 'a1-main/m2-bll/thunks/register-thunk';
import { credentialsType } from 'a1-main/m3-dal/types/registerType';
import {
  CONFIRM_PASSWORD,
  emailValidator,
  EMPTY_STRING,
  PASSWORD,
  TITLE_EMAIL,
  ZERO_LENGTH,
} from 'constants/common';
import { PATH } from 'enums/routes';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const Register = (): ReturnComponentType => {
  const passwordMinLength = 7;
  const errorEmailValidation = 'Email is incorrect';
  const errorEmailRequired = 'Email is required';
  const errorPasswordRequired = 'Password is required';
  const errorPasswordValidationMinLength = 'Password must be at least 7 characters';
  const errorPasswordConfirmValidation = 'Passwords mismatch';
  const [passwordError, setPasswordError] = useState<string>(EMPTY_STRING);
  const [passwordConfirmError, setPasswordConfirmError] = useState<string>(EMPTY_STRING);
  const [email, setEmail] = useState<string>(EMPTY_STRING);
  const [emailError, setEmailError] = useState<string>(EMPTY_STRING);
  const [password, setPassword] = useState<string>(EMPTY_STRING);
  const [passwordConfirm, setPasswordConfirm] = useState<string>(EMPTY_STRING);
  const signUpStatus = useSelector<AppRootState, boolean>(
    state => state.register.signUpStatus,
  );
  const isFetching = useSelector<AppRootState, boolean>(state => state.app.isFetching);
  const dispatch = useDispatch();

  const credentials: credentialsType = { email, password };
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (
      email.length === ZERO_LENGTH &&
      password.length === ZERO_LENGTH &&
      passwordConfirm.length === ZERO_LENGTH
    ) {
      setEmailError(errorEmailRequired);
      setPasswordError(errorPasswordRequired);
      setPasswordConfirmError(errorPasswordRequired);
      return;
    }

    if (email.length === ZERO_LENGTH) {
      setEmailError(errorEmailRequired);
    }
    if (email.match(emailValidator) === null && email.length > ZERO_LENGTH) {
      setEmailError(errorEmailValidation);
    }
    if (email.match(emailValidator)) {
      setEmailError(EMPTY_STRING);
    }

    if (password.length === ZERO_LENGTH) {
      setPasswordError(errorPasswordRequired);
    }
    if (password.length < passwordMinLength && password.length > ZERO_LENGTH) {
      setPasswordError(errorPasswordValidationMinLength);
    }
    if (password.length >= passwordMinLength) {
      setPasswordError(EMPTY_STRING);
    }

    if (passwordConfirm.length === ZERO_LENGTH) {
      setPasswordConfirmError(errorPasswordRequired);
    }
    if (
      passwordConfirm.length < passwordMinLength &&
      passwordConfirm.length > ZERO_LENGTH
    ) {
      setPasswordConfirmError(errorPasswordValidationMinLength);
    }
    if (passwordConfirm.length >= passwordMinLength) {
      setPasswordConfirmError(EMPTY_STRING);
    }

    if (passwordConfirm.length === ZERO_LENGTH) {
      setPasswordConfirmError(errorPasswordRequired);
      return;
    }
    if (
      passwordConfirm.length < passwordMinLength &&
      passwordConfirm.length > ZERO_LENGTH
    ) {
      setPasswordConfirmError(errorPasswordValidationMinLength);
    }
    if (
      password !== passwordConfirm &&
      password.length !== ZERO_LENGTH &&
      passwordConfirm.length !== ZERO_LENGTH
    ) {
      setPasswordConfirmError(errorPasswordConfirmValidation);
      return;
    }

    if (
      email.match(emailValidator) &&
      password.length >= passwordMinLength &&
      passwordConfirm.length >= passwordMinLength &&
      password === passwordConfirm
    ) {
      setEmailError(EMPTY_STRING);
      setPasswordError(EMPTY_STRING);
      setPasswordConfirmError(EMPTY_STRING);
      dispatch(toSignUp(credentials));
    }
  };
  if (signUpStatus) return <Navigate to={PATH.LOGIN} />;
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          title={TITLE_EMAIL}
          onChangeText={setEmail}
          value={email}
          type="email"
          // onEnter={showAlert}
          // error={error}
          // spanClassName={s.testSpanError}
        />
        {emailError && (
          <div>
            <span className={style.errorText}>{emailError}</span>
          </div>
        )}
        <Input
          title={PASSWORD}
          onChangeText={setPassword}
          value={password}
          type="password"
        />
        {passwordError && (
          <div>
            <span className={style.errorText}>{passwordError}</span>
          </div>
        )}
        <Input
          title={CONFIRM_PASSWORD}
          onChangeText={setPasswordConfirm}
          value={passwordConfirm}
          type="password"
        />
        {passwordConfirmError && (
          <div>
            <span className={style.errorText}>{passwordConfirmError}</span>
          </div>
        )}
        <div>
          <Button condition={isFetching} type="submit">
            Register
          </Button>
        </div>
        <div className={style.forgotblock}>
          <NavLink to={PATH.LOGIN_FORM} className={style.forgotPassword}>
            I can login
          </NavLink>
        </div>
      </form>
    </div>
  );
};
