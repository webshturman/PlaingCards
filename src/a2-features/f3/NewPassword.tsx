import React, { FormEvent, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';

import { Button } from '../../a1-main/m1-ui/components/common/CustomButton/Button';
import { Input } from '../../a1-main/m1-ui/components/common/CustomInput/Input';
import { AppRootState } from '../../a1-main/m2-bll/store';
import { renamePasswordTC } from '../../a1-main/m2-bll/thunks/password-thunk';
import {
  CONFIRM_PASSWORD,
  EMPTY_STRING,
  PASSWORD,
  ZERO_LENGTH,
} from '../../constants/common';
import { PATH } from '../../enums/routes';
import style from '../../styles/Login.module.css';

import { ReturnComponentType } from 'types/ReturnComponentType';

export type ReamePasswordType = {
  password: string;
  resetPasswordToken: string;
};

export const NewPassword = (): ReturnComponentType => {
  const [password, setPassword] = useState<string>(EMPTY_STRING);
  const [passwordConfirm, setPasswordConfirm] = useState<string>(EMPTY_STRING);
  const passwordMinLength = 7;
  const errorPasswordRequired = 'Password is required';
  const errorPasswordValidationMinLength = 'Password must be at least 7 characters';
  const errorPasswordConfirmValidation = 'Passwords mismatch';
  const [passwordError, setPasswordError] = useState<string>(EMPTY_STRING);
  const [passwordConfirmError, setPasswordConfirmError] = useState<string>(EMPTY_STRING);
  const passwordRename = useSelector<AppRootState, boolean>(
    state => state.password.passwordRename,
  );
  const isFetching = useSelector<AppRootState, boolean>(state => state.app.isFetching);
  const dispatch = useDispatch();

  const { token } = useParams<string>();
  const newPassword: ReamePasswordType = {
    password,
    resetPasswordToken: token || '',
  };

  const handlePasswordValueChange = (passwordValue: string): void => {
    setPassword(passwordValue);
    if (passwordError) {
      setPasswordError(EMPTY_STRING);
    }
  };

  const handlePasswordConfirmValueChange = (passwordConfirmValue: string): void => {
    setPasswordConfirm(passwordConfirmValue);
    if (passwordConfirmError) {
      setPasswordConfirmError(EMPTY_STRING);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (password.length === ZERO_LENGTH) {
      setPasswordError(errorPasswordRequired);
    }
    if (password.length < passwordMinLength && password.length > ZERO_LENGTH) {
      setPasswordError(errorPasswordValidationMinLength);
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

    if (password !== passwordConfirm) {
      setPasswordConfirmError(errorPasswordConfirmValidation);
    }
    if (
      password.length >= passwordMinLength &&
      passwordConfirm.length >= passwordMinLength &&
      password === passwordConfirm
    ) {
      setPasswordError(EMPTY_STRING);
      setPasswordConfirmError(EMPTY_STRING);
      dispatch(renamePasswordTC(newPassword));
    }
  };
  if (passwordRename) return <Navigate to={PATH.LOGIN_FORM} />;
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          title={PASSWORD}
          placeholder="Password"
          onChangeText={(passwordValue: string) =>
            handlePasswordValueChange(passwordValue)
          }
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
          placeholder="Password"
          onChangeText={(passwordConfirmValue: string) =>
            handlePasswordConfirmValueChange(passwordConfirmValue)
          }
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
            update
          </Button>
        </div>
      </form>
    </div>
  );
};
