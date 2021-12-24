export enum AUTH_ACTIONS_TYPE {
  SET_AUTH_STATUS = 'PlaingCards/auth/SET_AUTH_STATUS',
}

export type AuthActionsType = ReturnType<typeof setAuthStatus>;

export const setAuthStatus = (isAuth: boolean) =>
  ({
    type: AUTH_ACTIONS_TYPE.SET_AUTH_STATUS,
    isAuth,
  } as const);
