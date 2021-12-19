export enum ACTIONS_TYPE_APP {
  SET_ERROR_MESSAGE = 'app-reducer/GET_NEW_PASS_DATA',
  SET_IS_FETHING = 'app-reducer/SET_ISFETHING',
  SET_STATUS = 'app-reducer/SET_STATUS',
  SET_EMAIL = 'app-reducer/SET_EMAIL',
}
type SetAppStatusActionType =
  | ReturnType<typeof setErrorMessageAC>
  | ReturnType<typeof setIsFethingAC>
  | ReturnType<typeof setStatusAC>
  | ReturnType<typeof setEmailAC>;

export type AppActionType = SetAppStatusActionType;

export const setErrorMessageAC = (error: boolean, textError: string) =>
  ({
    type: ACTIONS_TYPE_APP.SET_ERROR_MESSAGE,
    error,
    textError,
  } as const);

export const setIsFethingAC = (isFetching: boolean) =>
  ({
    type: ACTIONS_TYPE_APP.SET_IS_FETHING,
    isFetching,
  } as const);

export const setStatusAC = (status: boolean) =>
  ({
    type: ACTIONS_TYPE_APP.SET_STATUS,
    status,
  } as const);

export const setEmailAC = (email: string) =>
  ({
    type: ACTIONS_TYPE_APP.SET_EMAIL,
    email,
  } as const);
