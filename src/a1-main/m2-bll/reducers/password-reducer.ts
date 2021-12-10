export type initialPasswordStateType = any;

const initialPasswordState: initialPasswordStateType = {};

export const passwordReducer = (
  state: initialPasswordStateType = initialPasswordState,
  action: any,
): initialPasswordStateType => {
  switch (action.type) {
    // case ACTIONS_TYPE.SET_PASSWORD_DATA:
    default:
      return state;
  }
};

// образец типов экшена

export enum ACTIONS_TYPE {
  SET_PASSWORD_DATA = 'password-reducer/SET_PASSWORD_DATA',
}
