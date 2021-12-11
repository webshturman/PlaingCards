export enum ACTIONS_TYPE {
  SET_REGISTER_STATUS = 'register-reducer/SET_REGISTER_STATUS',
}

export const setRegisterStatus = (registerStatus: boolean) =>
  ({
    type: ACTIONS_TYPE.SET_REGISTER_STATUS,
    registerStatus,
  } as const);

export type RegisterActionType = ReturnType<typeof setRegisterStatus>;
