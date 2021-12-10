export type initialRecoveryStateType = any;

const initialRecoveryState: initialRecoveryStateType = {};

export const profileReducer = (
  state: initialRecoveryStateType = initialRecoveryState,
  action: any,
): initialRecoveryStateType => {
  switch (action.type) {
    // case ACTIONS_TYPE.GET_NEW_PASS_DATA:
    default:
      return state;
  }
};

// образец типов экшена

export enum ACTIONS_TYPE {
  GET_NEW_PASS_DATA = 'recovery-reducer/GET_NEW_PASS_DATA',
}
