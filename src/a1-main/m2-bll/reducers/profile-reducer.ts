import { PROFILE_ACTIONS_TYPE, ProfileActionsType } from '../actions/profile-actions';

import { MeResponseStateType } from 'a1-main/m3-dal/types/loginType';

export type initialProfileStateType = any;

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

// export const saveUserDataTC =
//   (newName: string, newAvatar: File): AppThunk =>
//   async dispatch => {
//     dispatch(setStatusAC(true));
//     try {
//       await authAPI.renewDataUser(newName, newAvatar);
//     } catch (error) {
//       if (axios.isAxiosError(error) && error.response) {
//         const errorMessage = error.response;
//         dispatch(setErrorMessageAC(true, `Error: ${errorMessage}`));
//       } else if (axios.isAxiosError(error) && error.message === 'Network Error') {
//         dispatch(setErrorMessageAC(true, `Error:no connection!`));
//       }
//     } finally {
//       dispatch(setStatusAC(false));
//     }
//   };
