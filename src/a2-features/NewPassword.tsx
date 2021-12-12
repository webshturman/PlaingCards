import React, { useState } from 'react';

import { Button } from '../a1-main/m1-ui/components/common/CustomButton/Button';
import { Input } from '../a1-main/m1-ui/components/common/CustomInput/Input';
import { CONFIRM_PASSWORD, EMPTY_STRING, PASSWORD } from '../constants/common';

import { ReturnComponentType } from 'types/ReturnComponentType';

export const NewPassword = (): ReturnComponentType => {
  const [password, setPassword] = useState<string>(EMPTY_STRING);
  const [passwordConfirm, setPasswordConfirm] = useState<string>(EMPTY_STRING);
  const passLenght = 7;
  const handleSubmit = (): void => {
    if (password !== passwordConfirm || password.length < passLenght) {
      console.log('The passwords do not match');
      return;
    }
    console.log(password);
    console.log(passwordConfirm);
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
          <Button>Register</Button>
        </div>
      </form>
    </div>
  );
};
