import React from 'react';

import { Button } from './common/CustomButton/Button';
import { Checkbox } from './common/CustomCheckBox/CheckBox';

import { ReturnComponentType } from 'types/ReturnComponentType';

export const Profile = (): ReturnComponentType => (
  <div>
    Profile
    <Button>Нажми</Button>
    <Checkbox>Check your success</Checkbox>
  </div>
);
