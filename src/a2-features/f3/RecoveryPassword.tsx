import React, { useState } from 'react';

import { Button } from '../../a1-main/m1-ui/components/common/CustomButton/Button';
import { Input } from '../../a1-main/m1-ui/components/common/CustomInput/Input';
import { EMPTY_STRING, TITLE_EMAIL } from '../../constants/common';

import { ReturnComponentType } from 'types/ReturnComponentType';

export const RecoveryPassword = (): ReturnComponentType => {
  const [email, setEmail] = useState<string>(EMPTY_STRING);
  const handleSubmit = (): void => {
    console.log(email);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input title={TITLE_EMAIL} onChangeText={setEmail} value={email} type="text" />
        <div>
          <Button>Register</Button>
        </div>
      </form>
    </div>
  );
};
