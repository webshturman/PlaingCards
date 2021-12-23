import React, { FormEvent, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { Button } from '../../a1-main/m1-ui/components/common/CustomButton/Button';
import { Input } from '../../a1-main/m1-ui/components/common/CustomInput/Input';
import { AppRootState } from '../../a1-main/m2-bll/store';
import { sendMessageOnEmailTC } from '../../a1-main/m2-bll/thunks/password-thunk';
import { emailValidator, EMPTY_STRING, EMAIL, ZERO_LENGTH } from '../../constants/common';
import { PATH } from '../../enums/routes';
import style from '../../styles/Login.module.css';

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
  const emailForMail = useSelector<AppRootState, string>(state => state.app.email);
  const isFetching = useSelector<AppRootState, boolean>(state => state.app.isFetching);
  const [email, setEmail] = useState<string>(EMPTY_STRING);
  const [emailError, setEmailError] = useState<string>(EMPTY_STRING);
  const [messageSuccess, setMessageSuccess] = useState<boolean>(sendMessageSuccess);
  const errorEmailValidation = 'Email is incorrect';
  const errorEmailRequired = 'Email is required';

  useEffect(() => {
    setMessageSuccess(sendMessageSuccess);
  }, [sendMessageSuccess]);

  const dispatch = useDispatch();

  const letterToThePost: LetterType = {
    email,
    from: 'test-front-admin <ai73a@yandex.by>',
    message: `<div style='background-color: #d6f8f0; padding: 20px'>
'password recovery link': <a href='http://localhost:3000/PlaingCards/new_pass#/new_pass/$token$/'>link</a></div>`,
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (email.length === ZERO_LENGTH) {
      setEmailError(errorEmailRequired);
      return;
    }
    if (email.match(emailValidator) === null && email.length > ZERO_LENGTH) {
      setEmailError(errorEmailValidation);
      return;
    }

    if (email.match(emailValidator)) {
      setEmailError(EMPTY_STRING);
      dispatch(sendMessageOnEmailTC(letterToThePost));
    }
  };
  return (
    <div>
      {messageSuccess ? (
        <div>
          <p>
            check your mail:
            <b>{emailForMail}</b>. <br />
            follow the link for password recovery
          </p>
        </div>
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <Input
              title={EMAIL}
              placeholder="Email"
              onChangeText={setEmail}
              value={email}
              type="email"
            />
            {emailError && (
              <div>
                <span className={style.errorText}>{emailError}</span>
              </div>
            )}
            <div>
              <Button condition={isFetching} type="submit">
                send
              </Button>
            </div>
          </form>
          <div className={style.forgotblock}>
            <NavLink to={PATH.LOGIN_FORM} className={style.forgotPassword}>
              I remembered the password
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};
