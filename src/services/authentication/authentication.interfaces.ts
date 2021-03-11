import { ReactNode } from "react";
import { User } from "./authentication.service";

export enum AuthActions {
  AuthLoginStarted = "AUTH_LOGIN_STARTED",
  AuthLoginFinished = "AUTH_LOGIN_FINISHED",
  AuthLoginFailed = "AUTH_LOGIN_FAILED",
  AuthRegisterStarted = "AUTH_REGISTER_STARTED",
  AuthRegisterFinished = "AUTH_REGISTER_FINISHED",
  AuthRegisterFailed = "AUTH_REGISTER_FAILED",
  AuthLogout = "AUTH_LOGOUT",
}

export type Action =
  | {
      type: AuthActions.AuthLoginStarted;
    }
  | { type: AuthActions.AuthLoginFinished; payload: { user: User } }
  | { type: AuthActions.AuthLoginFailed; payload: { error: null | string } }
  | { type: AuthActions.AuthRegisterStarted }
  | { type: AuthActions.AuthRegisterFinished; payload: { user: User } }
  | { type: AuthActions.AuthRegisterFailed; payload: { error: null | string } }
  | { type: AuthActions.AuthLogout; payload: { user: undefined } };

export type Dispatch = (action: Action) => void;
export type State = {
  user?: User | undefined;
  loading: boolean;
  error?: null | string;
};
export type AuthenticationProviderProps = { children: ReactNode };

export type AuthenticationContextType = {
  state: State;
  dispatch: Dispatch;
};

export type RegisterFormType = {
  email: string;
  password: string;
  repeatedPassword: string;
};
