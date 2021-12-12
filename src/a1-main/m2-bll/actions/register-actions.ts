export enum ACTIONS_TYPE {
  SET_REGISTER_STATUS = 'register-reducer/SET_REGISTER_STATUS',
}

type SetRegisterStatusActionType = ReturnType<typeof setRegisterStatus>;

export type RegisterActionType = SetRegisterStatusActionType;

export const setRegisterStatus = (registerStatus: boolean) =>
  ({
    type: ACTIONS_TYPE.SET_REGISTER_STATUS,
    registerStatus,
  } as const);
