import styled, { DefaultTheme, useTheme } from "styled-components/native";
import React, { ReactNode } from "react";

const sizeVariant = {
  small: 1,
  medium: 2,
  large: 3,
};

const positionVariant = {
  top: "marginTop",
  left: "marginLeft",
  bottom: "marginBottom",
  right: "marginRight",
};

interface SpacerProps {
  position: keyof typeof positionVariant;
  size: keyof typeof sizeVariant;
  children: ReactNode;
}

interface SpacerView {
  variant: string;
}

const getVariant = (
  theme: DefaultTheme,
  size: keyof typeof sizeVariant,
  position: keyof typeof positionVariant
): string => {
  const sizeIndex = sizeVariant[size];
  const property = positionVariant[position];
  const value = theme.space[sizeIndex];

  return `${property}: ${value}`;
};

const SpacerView = styled.View<SpacerView>`
  ${(props) => props.variant}
`;

export const Spacer = (props: SpacerProps) => {
  const theme = useTheme();
  const variant = getVariant(theme, props.size, props.position);

  return <SpacerView variant={variant}>{props.children}</SpacerView>;
};
