import styled from "styled-components/native";
import { Button, TextInput } from "react-native-paper";
import { Text } from "components/typography";

export const Title = styled(Text)`
  font-size: 30px;
`;
export const AccountBackground = styled.ImageBackground.attrs({
  source: require("../../../../assets/home_bg.jpg"),
})`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const AuthInput = styled(TextInput)`
  width: 300px;
`;

export const AccountContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.7);
  padding: ${(props) => props.theme.space[4]};
  margin-top: ${(props) => props.theme.space[2]};
`;

export const AccountButton = styled(Button)`
  padding: ${(props) => props.theme.space[2]};
`;

export const ErrorContainer = styled.View`
  max-width: 300px;
  align-items: center;
  align-self: center;
  margin-top: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[2]};
`;
