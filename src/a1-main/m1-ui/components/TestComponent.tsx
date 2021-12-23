import React from 'react';

import { Button } from './common/CustomButton/Button';
import { Checkbox } from './common/CustomCheckBox/CheckBox';
import { Input } from './common/CustomInput/Input';

import { PASSWORD, EMAIL } from 'constants/common';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const TestComponent = (): ReturnComponentType => (
  <div>
    <Input
      title={EMAIL}
      // onChangeText={setText}
      // onEnter={showAlert}
      // error={error}
      // spanClassName={s.testSpanError}
      //  value={value}
    />
    <Input title={PASSWORD} />
    <div>
      <Checkbox>Remember me</Checkbox>
    </div>
    <div>
      <Button>Нажми</Button>
    </div>
  </div>
);
