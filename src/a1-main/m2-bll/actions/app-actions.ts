export enum ACTIONS_TYPE_APP {
  SET_ERROR_MESSAGE = 'recovery-reducer/GET_NEW_PASS_DATA',
  SET_IS_FETHING = 'recovery-reducer/SET_ISFETHING',
}
type SetAppStatusActionType =
  | ReturnType<typeof setErrorMessageAC>
  | ReturnType<typeof setIsFethingAC>;

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
