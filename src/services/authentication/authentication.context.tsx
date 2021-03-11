import React, { createContext, useContext, useEffect, useReducer } from "react";
import {
  authRequests,
  loginRequest,
  logoutRequest,
  registerRequest,
} from "./authentication.service";
import {
  RegisterFormType,
  State,
  AuthenticationContextType,
  Dispatch,
  AuthActions,
  Action,
  AuthenticationProviderProps,
} from "./authentication.interfaces";

const initialAuthenticationState: State = {
  user: undefined,
  loading: false,
  error: null,
};

const AuthenticationContext = createContext<
  AuthenticationContextType | undefined
>(undefined);

function authenticationReducer(state: State, action: Action): State {
  switch (action.type) {
    case AuthActions.AuthLoginStarted:
      return { loading: true };
    case AuthActions.AuthRegisterStarted:
      return { loading: true };
    case AuthActions.AuthLoginFinished:
      return {
        user: { ...state.user, ...action.payload.user },
        loading: false,
      };
    case AuthActions.AuthRegisterFinished:
      return {
        user: { ...state.user, ...action.payload.user },
        loading: false,
      };
    case AuthActions.AuthLoginFailed:
      return { error: action.payload.error, loading: false };
    case AuthActions.AuthRegisterFailed:
      return { error: action.payload.error, loading: false };
    case AuthActions.AuthLogout:
      return { user: undefined, loading: false };
    default:
      return state;
  }
}

const AuthenticationProvider = (props: AuthenticationProviderProps) => {
  const [state, dispatch] = useReducer(
    authenticationReducer,
    initialAuthenticationState
  );

  useEffect(() => {
    authRequests().onAuthStateChanged((usr) => {
      dispatch({ type: AuthActions.AuthLoginStarted });
      if (usr) {
        dispatch({
          type: AuthActions.AuthLoginFinished,
          payload: { user: usr },
        });
      } else {
        dispatch({
          type: AuthActions.AuthLogout,
          payload: { user: undefined },
        });
      }
    });
  }, []);

  const value = { state, dispatch };

  return (
    <AuthenticationContext.Provider value={value}>
      {props.children}
    </AuthenticationContext.Provider>
  );
};

const loginUser = async (
  dispatch: Dispatch,
  loginForm: { email: string; password: string }
) => {
  dispatch({ type: AuthActions.AuthLoginStarted });
  try {
    const user = await loginRequest(loginForm.email, loginForm.password);
    dispatch({ type: AuthActions.AuthLoginFinished, payload: { user } });
  } catch (error) {
    dispatch({
      type: AuthActions.AuthLoginFailed,
      payload: { error: error.toString() },
    });
  }
};

const logoutUser = () => logoutRequest();

const registerUser = async (
  dispatch: Dispatch,
  registerForm: RegisterFormType
) => {
  dispatch({ type: AuthActions.AuthRegisterStarted });
  try {
    const user = await registerRequest(
      registerForm.email,
      registerForm.password
    );
    dispatch({ type: AuthActions.AuthRegisterFinished, payload: { user } });
  } catch (error) {
    dispatch({
      type: AuthActions.AuthRegisterFailed,
      payload: { error: error.toString() },
    });
  }
};

function useAuthentication() {
  const context = useContext(AuthenticationContext);
  if (context === undefined) {
    throw new Error(
      "useAuthentication must be used within a AuthenticationProvider"
    );
  }

  return context;
}

export {
  AuthenticationProvider,
  useAuthentication,
  loginUser,
  registerUser,
  logoutUser,
};
