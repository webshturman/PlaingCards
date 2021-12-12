export enum AUTH_ACTIONS_TYPE {
  SET_USER_DATA = 'PlaingCards/auth/SET-USER-DATA',
  SET_USER_PHOTO = 'PlaingCards/auth/SET-USER-PHOTO',
}

type SetUserDataActionType = ReturnType<typeof setAuthUserData>;

export type AuthActionsType = SetUserDataActionType;

export const setAuthUserData = (authUserData: {
  _id: string | null;
  email: string | null;
  name: string | null;
  avatar?: string | null;
  publicCardPacksCount: number | null;
  created: Date | null;
  updated: Date | null;
  isAdmin: boolean | null;
  verified: boolean | null;
  rememberMe: boolean | null;
  error?: string | null;
}) =>
  ({
    type: AUTH_ACTIONS_TYPE.SET_USER_DATA,
    data: { ...authUserData, isAuth: true },
  } as const);
