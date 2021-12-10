export type initialRegisterStateType = any;

const initialRegisterState: initialRegisterStateType = {};

export const registerReducer = (
  state: initialRegisterStateType = initialRegisterState,
  action: any,
): initialRegisterStateType => {
  switch (action.type) {
    // case ACTIONS_TYPE.SET_REGISTER_DATA:
    default:
      return state;
  }
};

// образец типов экшена

export enum ACTIONS_TYPE {
  SET_REGISTER_DATA = 'register-reducer/SET_REGISTER_DATA',
}
