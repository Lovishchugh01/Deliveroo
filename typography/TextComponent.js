import styled from "styled-components/native";

const defaultTextStyles = (theme) => `
  font-family: ${theme.fonts.body};
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.text.primary};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const body = (theme) => `
    font-weight: ${theme.fontWeights.bold};
    font-size: ${theme.fontSizes.body};
    font-size: ${theme.fontSizes.title};
    color: ${theme.colors.text.quaternary}
`;

const hint = (theme) => `
    font-size: ${theme.fontSizes.body};
    color: ${theme.colors.brand.navy}
    font-weight: ${theme.fontWeights.bold};


`;

const error = (theme) => `
    font-size: ${theme.fontSizes.body};
    color: ${theme.colors.text.error};
`;

const caption = (theme) => `
    color: ${theme.colors.text.secondary};
    font-weight: ${theme.fontWeights.bold};
    
`;

const label = (theme) => `
    font-family: ${theme.fonts.body};
    font-size: ${theme.fontSizes.body};
    font-weight: ${theme.fontWeights.bold};
`;
const green = (theme) => `
    color: ${theme.colors.text.green};
    font-family: ${theme.fonts.body};
    font-size: ${theme.fontSizes.body};
    font-weight: ${theme.fontWeights.bold};
`;
const variants = {
  body,
  label,
  caption,
  error,
  hint,
  green
};

export const Text = styled.Text`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ variant, theme }) => variants[variant](theme)}
`;

Text.defaultProps = {
  variant: "body",
};