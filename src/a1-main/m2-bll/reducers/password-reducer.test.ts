import {
  successRenamePasswordAC,
  successSendMessgeAC,
} from '../actions/password-actions';

import { InitialPasswordStateType, passwordReducer } from './password-reducer';

test('message on post should be send', () => {
  const startState: InitialPasswordStateType = {
    sendMessageSuccess: false,
    passwordRename: false,
  };

  const action = successSendMessgeAC(true);

  const endState = passwordReducer(startState, action);

  expect(endState.sendMessageSuccess).toBe(true);
  expect(endState === startState).toBeFalsy();
});

test('the password should be changed', () => {
  const startState: InitialPasswordStateType = {
    sendMessageSuccess: false,
    passwordRename: false,
  };

  const action = successRenamePasswordAC(true);

  const endState = passwordReducer(startState, action);

  expect(endState.passwordRename).toBe(true);
  expect(endState === startState).toBeFalsy();
});
