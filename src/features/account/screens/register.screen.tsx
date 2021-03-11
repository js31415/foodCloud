import { StackScreenProps } from "@react-navigation/stack";
import { Spacer } from "components/spacer";
import { Text } from "components/typography";
import { AccountParamList } from "infrastructure/navigation/account.navigation";
import { ActivityIndicator, Colors } from "react-native-paper";
import React, { useState } from "react";
import {
  useAuthentication,
  registerUser,
} from "services/authentication/authentication.context";
import {
  AccountBackground,
  AccountButton,
  AccountContainer,
  AuthInput,
  ErrorContainer,
} from "../components/account.styles";

type RegisterScreenProps = StackScreenProps<AccountParamList, "Register">;

export const RegisterScreen = (props: RegisterScreenProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatedPassword, setRepeatedPassword] = useState<string>("");
  const { state, dispatch } = useAuthentication();

  console.log(state);

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
        <Spacer position="top" size="large">
          <AuthInput
            label="Repeat Password"
            value={repeatedPassword}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(p: string) => setRepeatedPassword(p)}
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
              onPress={() =>
                registerUser(dispatch, { email, password, repeatedPassword })
              }
            >
              Register
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
