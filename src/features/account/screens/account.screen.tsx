import { StackScreenProps } from "@react-navigation/stack";
import { Spacer } from "components/spacer";
import { Text } from "components/typography";
import { AccountParamList } from "infrastructure/navigation/account.navigation";
import React from "react";
import {
  AccountBackground,
  AccountButton,
  AccountContainer,
} from "../components/account.styles";

type AccountScreenProps = StackScreenProps<AccountParamList, "Account">;

export const AccountScreen = (props: AccountScreenProps) => {
  return (
    <AccountBackground blurRadius={10}>
      <Text variant="title">Food CLOUD</Text>
      <AccountContainer>
        <Spacer position={"bottom"} size={"large"}>
          <AccountButton
            icon="lock-open-outline"
            mode="contained"
            onPress={() =>
              props.navigation.navigate("Login", { name: "Login" })
            }
          >
            Log in
          </AccountButton>
        </Spacer>

        <AccountButton
          icon="account-arrow-right-outline"
          mode="contained"
          onPress={() =>
            props.navigation.navigate("Register", { name: "Register" })
          }
        >
          Register
        </AccountButton>
      </AccountContainer>
    </AccountBackground>
  );
};
