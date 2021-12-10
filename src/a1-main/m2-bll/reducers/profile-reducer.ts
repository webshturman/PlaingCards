export type initialProfileStateType = any;

const initialProfileState: initialProfileStateType = {};

export const profileReducer = (
  state: initialProfileStateType = initialProfileState,
  action: any,
): initialProfileStateType => {
  switch (action.type) {
    // case ACTIONS_TYPE.GET_PROFILE_DATA:
    default:
      return state;
  }
};

// образец типов экшена

export enum ACTIONS_TYPE {
  GET_PROFILE_DATA = 'profile-reducer/GET_PROFILE_DATA',
}
