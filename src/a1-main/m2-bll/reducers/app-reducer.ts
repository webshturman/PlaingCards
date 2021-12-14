import { ACTIONS_TYPE_APP, AppActionType } from '../actions/app-actions';

export type initialRecoveryStateType = {
  error: boolean;
  textError: string;
  isFetching: boolean;
};

const initialRecoveryState: initialRecoveryStateType = {
  error: false,
  textError: '',
  isFetching: false,
};

export const appReducer = (
  state: initialRecoveryStateType = initialRecoveryState,
  action: AppActionType,
): initialRecoveryStateType => {
  switch (action.type) {
    case ACTIONS_TYPE_APP.SET_ERROR_MESSAGE:
      return { ...state, error: action.error, textError: action.textError };
    case ACTIONS_TYPE_APP.SET_IS_FETHING:
      return { ...state, isFetching: action.isFetching };
    default:
      return state;
  }
};
