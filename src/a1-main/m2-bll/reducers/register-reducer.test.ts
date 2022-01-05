import { setRegisterStatus } from '../actions/register-actions';

import { InitialRegisterStateType, registerReducer } from './register-reducer';

test('registration completed successfully', () => {
  const startState: InitialRegisterStateType = {
    signUpStatus: false,
  };

  const action = setRegisterStatus(true);

  const endState = registerReducer(startState, action);

  expect(endState.signUpStatus).toBe(true);
});
