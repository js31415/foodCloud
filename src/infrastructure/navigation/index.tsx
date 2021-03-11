import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { useAuthentication } from "services/authentication/authentication.context";
import { AppNavigator } from "./app.navigation";
import { AccountNavigator } from "./account.navigation";

export const Navigation = () => {
  const { state } = useAuthentication();

  return (
    <NavigationContainer>
      {state.user ? <AppNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
};
