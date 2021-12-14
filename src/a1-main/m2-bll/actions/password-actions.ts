export enum ACTIONS_TYPE_PASSWORD {
  SEND_MESSAGE_ON_MAIL = 'password-reducer/SEND_MESSAGE_ON_MAIL',
  RENAME_PASSWORD = 'password-reducer/RENAME_PASSWORD',
}

export const successSendMessgeAC = (sendMessageSuccess: boolean) =>
  ({
    type: ACTIONS_TYPE_PASSWORD.SEND_MESSAGE_ON_MAIL,
    sendMessageSuccess,
  } as const);

export const successRenamePasswordAC = (passwordRename: boolean) =>
  ({
    type: ACTIONS_TYPE_PASSWORD.RENAME_PASSWORD,
    passwordRename,
  } as const);

export type PasswordActionType =
  | ReturnType<typeof successSendMessgeAC>
  | ReturnType<typeof successRenamePasswordAC>;
