import { MeResponseStateType } from '../../m3-dal/types/loginType';

export enum PROFILE_ACTIONS_TYPE {
  SET_USER_DATA = 'PlaingCards/profile/SET-USER-DATA',
  DELETE_USER_DATA = 'PlaingCards/profile/DELETE_USER_DATA',
}

type SetUserDataActionType = ReturnType<typeof setAuthUserData>;
type DeleteUserDataActionType = ReturnType<typeof deleteUserData>;

export type ProfileActionsType = SetUserDataActionType | DeleteUserDataActionType;

export const setAuthUserData = (authUserData: MeResponseStateType) =>
  ({
    type: PROFILE_ACTIONS_TYPE.SET_USER_DATA,
    authUserData,
  } as const);

export const deleteUserData = () =>
  ({
    type: PROFILE_ACTIONS_TYPE.DELETE_USER_DATA,
  } as const);
