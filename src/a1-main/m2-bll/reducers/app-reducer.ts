import { ACTIONS_TYPE_APP, AppActionType } from '../actions/app-actions';

const initialRecoveryState = {
  error: false,
  textError: '',
  isFetching: false,
};

type InitialRecoveryStateType = typeof initialRecoveryState;

export const appReducer = (
  state: InitialRecoveryStateType = initialRecoveryState,
  action: AppActionType,
): InitialRecoveryStateType => {
  switch (action.type) {
    case ACTIONS_TYPE_APP.SET_ERROR_MESSAGE:
      return { ...state, error: action.error, textError: action.textError };
    case ACTIONS_TYPE_APP.SET_IS_FETHING:
      return { ...state, isFetching: action.isFetching };
    default:
      return state;
  }
};
