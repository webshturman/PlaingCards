export type initialLoginStateType = any;

const initialLoginState: initialLoginStateType = {};

export const loginReducer = (
  state: initialLoginStateType = initialLoginState,
  action: any,
): initialLoginStateType => {
  switch (action.type) {
    // case ACTIONS_TYPE.SET_LOGIN_DATA:
    default:
      return state;
  }
};

// образец типов экшена

export enum ACTIONS_TYPE {
  SET_LOGIN_DATA = 'login-reducer/SET_LOGIN_DATA',
}
