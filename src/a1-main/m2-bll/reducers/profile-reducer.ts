import { PROFILE_ACTIONS_TYPE, ProfileActionsType } from '../actions/profile-actions';

import { MeResponseStateType } from 'a1-main/m3-dal/types/loginType';

export type InitialProfileStateType = any;

const initialProfileState: MeResponseStateType = {
  _id: null,
  email: null,
  name: null,
  avatar: null,
  publicCardPacksCount: null,
  created: null,
  updated: null,
  isAdmin: null,
  verified: null,
  rememberMe: null,
  error: null,
};

export const profileReducer = (
  state: MeResponseStateType = initialProfileState,
  action: ProfileActionsType,
): MeResponseStateType => {
  switch (action.type) {
    case PROFILE_ACTIONS_TYPE.SET_USER_DATA: {
      return {
        ...state,
        ...action.authUserData,
      };
    }
    case PROFILE_ACTIONS_TYPE.UPDATE_USER_DATA: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case PROFILE_ACTIONS_TYPE.DELETE_USER_DATA: {
      return initialProfileState;
    }
    default:
      return state;
  }
};
