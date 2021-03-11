import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  RegisterScreen,
  LoginScreen,
  AccountScreen,
} from "features/account/screens";

export type AccountParamList = {
  Account: { name: string };
  Login: { name: string };
  Register: { name: string };
};

const AccountStack = createStackNavigator<AccountParamList>();

export const AccountNavigator = () => {
  return (
    <AccountStack.Navigator headerMode="none">
      <AccountStack.Screen name="Account" component={AccountScreen} />
      <AccountStack.Screen name="Login" component={LoginScreen} />
      <AccountStack.Screen name="Register" component={RegisterScreen} />
    </AccountStack.Navigator>
  );
};
