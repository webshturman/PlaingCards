import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Button } from '../a1-main/m1-ui/components/common/CustomButton/Button';
import { Input } from '../a1-main/m1-ui/components/common/CustomInput/Input';
import { renamePassword } from '../a1-main/m2-bll/thunks/password-thunk';
import { CONFIRM_PASSWORD, EMPTY_STRING, PASSWORD } from '../constants/common';

import { ReturnComponentType } from 'types/ReturnComponentType';

export type ReamePasswordType = {
  password: string;
  resetPasswordToken: string;
};

export const NewPassword = (): ReturnComponentType => {
  const [password, setPassword] = useState<string>(EMPTY_STRING);
  const [passwordConfirm, setPasswordConfirm] = useState<string>(EMPTY_STRING);
  const dispatch = useDispatch();
  const { token } = useParams<string>();
  const newPassword: ReamePasswordType = {
    password,
    resetPasswordToken: token || '',
  };
  const handleSubmit = (): void => {
    if (password !== passwordConfirm) {
      console.log('The passwords do not match');
      return;
    }
    console.log(token);
    dispatch(renamePassword(newPassword));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
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
          <Button>update</Button>
        </div>
      </form>
    </div>
  );
};
