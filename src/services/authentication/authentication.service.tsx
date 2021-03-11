import { auth, User as FireBaseUser } from "firebase";

export type User = auth.UserCredential | FireBaseUser;

const loginRequest = (email: string, password: string): Promise<User> => {
  return auth().signInWithEmailAndPassword(email, password);
};

const registerRequest = (email: string, password: string): Promise<User> => {
  return auth().createUserWithEmailAndPassword(email, password);
};

const authRequests = () => {
  return auth();
};

const logoutRequest = () => {
  return auth().signOut();
};

export { loginRequest, registerRequest, authRequests, logoutRequest };
