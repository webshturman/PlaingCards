import { Nullable } from 'types/Nullable';

export type LoginCredentialsSendType = {
  email: string | null;
  password: string | null;
  rememberMe: boolean | null;
};

export type LoginResponseStateType = {
  _id: Nullable<string>;
  email: Nullable<string>;
  name: Nullable<string>;
  avatar?: Nullable<string>;
  publicCardPacksCount: Nullable<number>;
  created: Nullable<Date>;
  updated: Nullable<Date>;
  isAdmin: Nullable<boolean>;
  verified: Nullable<boolean>;
  rememberMe: Nullable<boolean>;
  error?: Nullable<string>;
  isAuth: boolean;
};

export type MeResponseStateType = {
  _id: Nullable<string>;
  email: Nullable<string>;
  name: Nullable<string>;
  avatar?: Nullable<string>;
  publicCardPacksCount: Nullable<number>;
  created: Nullable<Date>;
  updated: Nullable<Date>;
  isAdmin: Nullable<boolean>;
  verified: Nullable<boolean>;
  rememberMe: Nullable<boolean>;
  error?: Nullable<string>;
};

export type DeleteMeResponseStateType = {
  info: string;
  error: string;
};
