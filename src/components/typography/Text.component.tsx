import styled, { DefaultTheme } from "styled-components/native";

const defaultTextStyles = (theme: DefaultTheme) => `
font-family: ${theme.fonts.body};
font-weight: ${theme.fontWeights.regular};
color: ${theme.colors.text.primary};
flex-wrap: wrap;
margin-top: 0px;
margin-bottom: 0px;
`;

const title = (theme: DefaultTheme) => `
font-size: ${theme.fontSizes.title};
`;

const body = (theme: DefaultTheme) => `
    font-size: ${theme.fontSizes.body};
`;

const hint = (theme: DefaultTheme) => `
    font-size: ${theme.fontSizes.body};
`;

const error = (theme: DefaultTheme) => `
    color: ${theme.colors.text.error};
`;

const caption = (theme: DefaultTheme) => `
    font-size: ${theme.fontSizes.caption};
    font-weight: ${theme.fontWeights.bold};
`;

const label = (theme: DefaultTheme) => `
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.body};
    font-weight: ${theme.fontWeights.medium};
`;

const variants = {
  body,
  label,
  caption,
  error,
  hint,
  title,
};

interface TextProps {
  theme: DefaultTheme;
  variant: keyof typeof variants;
}

export const Text = styled.Text<TextProps>`
  ${(props) => defaultTextStyles(props.theme)}
  ${(props) => variants[props.variant](props.theme)}
`;
