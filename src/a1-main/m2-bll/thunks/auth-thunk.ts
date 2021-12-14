import { RESPONSE_STATUS_OK } from '../../../constants/common';
import { authAPI } from '../../m3-dal/auth-api';
import { LoginCredentialsSendType } from '../../m3-dal/types/loginType';
import { setAuthUserData } from '../actions/auth-actions';
import { AppThunk } from '../store';

export const toAuth =
  (credentials: LoginCredentialsSendType): AppThunk =>
  async dispatch => {
    // dispatch(setIsFethingAC(true)); // прелоудер
    try {
      const response = await authAPI.login(credentials);
      if (response.status === RESPONSE_STATUS_OK) {
        dispatch(setAuthUserData({ ...response.data }));
        // dispatch(successRenamePasswordAC(false)); // отдать сереге обнуление редиректа на логин
        // dispatch(setErrorMessageAC(false, '')); // сброс ошибки
        // dispatch(setIsFethingAC(false)); // сброс прелоудера
        console.log('login success, auth user data saved in store:');
        console.log(response.data);
      }
    } catch (error) {
      // if (axios.isAxiosError(error) && error.response) {
      // типизация ошибки
      // const errorMessage = error.response.data.error; // установка ошибки
      // dispatch(setErrorMessageAC(true, `Не получилось залогиниться! ${errorMessage}`));
      // dispatch(setIsFethingAC(false)); // сброс прелоудера
      console.log(`login ${error}`);
    }
    // }
  };
