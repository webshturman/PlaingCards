import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Button } from '../../a1-main/m1-ui/components/common/CustomButton/Button';
import { Input } from '../../a1-main/m1-ui/components/common/CustomInput/Input';
import { sendMessageOnEmail } from '../../a1-main/m2-bll/reducers/password-reducer';
import { AppRootState } from '../../a1-main/m2-bll/store';
import { EMPTY_STRING, TITLE_EMAIL } from '../../constants/common';

import { ReturnComponentType } from 'types/ReturnComponentType';

export type LetterType = {
  email: string;
  from: string;
  message: string;
};

export const RecoveryPassword = (): ReturnComponentType => {
  const sendMessageSuccess = useSelector<AppRootState, boolean>(
    state => state.password.sendMessageSuccess,
  );
  const [email, setEmail] = useState<string>(EMPTY_STRING);
  const [messageSuccess, setMessageSuccess] = useState<boolean>(sendMessageSuccess);
  useEffect(() => {
    setMessageSuccess(sendMessageSuccess);
  }, [sendMessageSuccess]);
  const dispatch = useDispatch();
  const letterToThePost: LetterType = {
    email,
    from: 'test-front-admin <ai73a@yandex.by>',
    message: `<div style='background-color: #d6f8f0; padding: 20px'>
'password recovery link': <a href='http://localhost:3000/PlaingCards/$token$/#/new_pass'>link</a></div>`,
  };

  const handleSubmit = (): void => {
    dispatch(sendMessageOnEmail(letterToThePost));
  };
  return (
    <div>
      {messageSuccess ? (
        <div>
          <p>
            Проверьте свою почту:
            <b>{email}</b>. И перейдите по ссылке для восстановления пароля
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input title={TITLE_EMAIL} onChangeText={setEmail} value={email} type="text" />
          <div>
            <Button>send</Button>
          </div>
        </form>
      )}
    </div>
  );
};
