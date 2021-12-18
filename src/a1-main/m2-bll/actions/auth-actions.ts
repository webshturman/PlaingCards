import { MeResponseStateType } from '../../m3-dal/types/loginType';

export enum AUTH_ACTIONS_TYPE {
  SET_USER_DATA = 'PlaingCards/auth/SET-USER-DATA',
  DELETE_USER_DATA = 'PlaingCards/auth/DELETE_USER_DATA',
}

type SetUserDataActionType = ReturnType<typeof setAuthUserData>;
type DeleteUserDataActionType = ReturnType<typeof deleteUserData>;

export type AuthActionsType = SetUserDataActionType | DeleteUserDataActionType;

export const setAuthUserData = (authUserData: MeResponseStateType, isAuth: boolean) =>
  ({
    type: AUTH_ACTIONS_TYPE.SET_USER_DATA,
    authUserData,
    isAuth,
  } as const);

export const deleteUserData = () =>
  ({
    type: AUTH_ACTIONS_TYPE.DELETE_USER_DATA,
  } as const);
