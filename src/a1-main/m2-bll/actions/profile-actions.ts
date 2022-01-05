import { MeResponseStateType } from '../../m3-dal/types/loginType';

import { Nullable } from 'types/Nullable';

export enum PROFILE_ACTIONS_TYPE {
  SET_USER_DATA = 'PlaingCards/profile/SET-USER-DATA',
  UPDATE_USER_DATA = 'PlaingCards/profile/UPDATE-USER-DATA',
  DELETE_USER_DATA = 'PlaingCards/profile/DELETE_USER_DATA',
}

type SetUserDataActionType = ReturnType<typeof setAuthUserData>;
type DeleteUserDataActionType = ReturnType<typeof deleteUserData>;
type UpdateUserDataActionType = ReturnType<typeof updateUserData>;

export type ProfileActionsType =
  | SetUserDataActionType
  | DeleteUserDataActionType
  | UpdateUserDataActionType;

export const setAuthUserData = (authUserData: MeResponseStateType) =>
  ({
    type: PROFILE_ACTIONS_TYPE.SET_USER_DATA,
    authUserData,
  } as const);

export const updateUserData = (
  name: Nullable<string>,
  avatar: Nullable<string> | undefined,
) =>
  ({
    type: PROFILE_ACTIONS_TYPE.UPDATE_USER_DATA,
    payload: { name, avatar },
  } as const);

export const deleteUserData = () =>
  ({
    type: PROFILE_ACTIONS_TYPE.DELETE_USER_DATA,
  } as const);
