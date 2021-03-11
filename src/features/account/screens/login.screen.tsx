import { StackScreenProps } from "@react-navigation/stack";
import { Spacer } from "components/spacer";
import { Text } from "components/typography";
import { ActivityIndicator, Colors } from "react-native-paper";
import { AccountParamList } from "infrastructure/navigation/account.navigation";
import React, { useState } from "react";
import {
  useAuthentication,
  loginUser,
} from "services/authentication/authentication.context";
import {
  AccountBackground,
  AccountButton,
  AccountContainer,
  AuthInput,
  ErrorContainer,
} from "../components/account.styles";

type LoginScreenProps = StackScreenProps<AccountParamList, "Login">;

export const LoginScreen = (props: LoginScreenProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { state, dispatch } = useAuthentication();

  return (
    <AccountBackground blurRadius={10}>
      <Text variant="title">Food CLOUD</Text>
      <AccountContainer>
        <AuthInput
          label="E-mail"
          value={email}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(u: string) => setEmail(u)}
        />
        <Spacer position="top" size="large">
          <AuthInput
            label="Password"
            value={password}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(p: string) => setPassword(p)}
          />
        </Spacer>
        {state.error && (
          <ErrorContainer>
            <Text variant="error">{state.error}</Text>
          </ErrorContainer>
        )}
        <Spacer position="top" size="large">
          {!state.loading ? (
            <AccountButton
              icon="lock-open-outline"
              mode="contained"
              onPress={() => loginUser(dispatch, { email, password })}
            >
              Login
            </AccountButton>
          ) : (
            <ActivityIndicator animating={true} color={Colors.blue300} />
          )}
        </Spacer>
      </AccountContainer>
      <Spacer position="top" size="large">
        <AccountButton
          mode="contained"
          onPress={() => props.navigation.goBack()}
        >
          Back
        </AccountButton>
      </Spacer>
    </AccountBackground>
  );
};
