import { Nullable } from '../../../types/Nullable';

export enum AUTH_ACTIONS_TYPE {
  SET_USER_DATA = 'PlaingCards/auth/SET-USER-DATA',
  SET_USER_PHOTO = 'PlaingCards/auth/SET-USER-PHOTO',
  TOGGLE_IS_FETCHING = 'PlaingCards/auth/TOGGLE-IS-FETCHING',
}

type SetUserDataActionType = ReturnType<typeof setAuthUserData>;
type ToggleIsFetchingActionType = ReturnType<typeof toggleIsFetching>;

export type AuthActionsType = SetUserDataActionType | ToggleIsFetchingActionType;

export const setAuthUserData = (authUserData: {
  _id: Nullable<string>;
  email: Nullable<string>;
  name: Nullable<string>;
  avatar?: Nullable<string>;
  publicCardPacksCount: Nullable<number>;
  created: Nullable<Date>;
  updated: Nullable<Date>;
  isAdmin: Nullable<boolean>;
  verified: Nullable<boolean>;
  rememberMe: Nullable<boolean>;
  error?: Nullable<string>;
  isAuth: boolean;
}) =>
  ({
    type: AUTH_ACTIONS_TYPE.SET_USER_DATA,
    data: { ...authUserData },
  } as const);

export const toggleIsFetching = (isFetching: boolean) =>
  ({ type: AUTH_ACTIONS_TYPE.TOGGLE_IS_FETCHING, isFetching } as const);
