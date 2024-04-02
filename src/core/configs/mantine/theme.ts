import { Anchor, Button, Input, createTheme } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'primary',
  primaryShade: 5,
  black: '#1B1D1F',
  colors: {
    primary: [
      '#e2f0ff',
      '#c2d9ec',
      '#a4bdd5',
      '#84a3bd',
      '#6d8eab',
      '#547a9a',
      '#476c89',
      '#375872',
      '#29455c',
      '#173144',
    ],
  },
  components: {
    Anchor: Anchor.extend({
      styles: (theme) => ({
        root: {
          color: theme.primaryColor,
        },
      }),
    }),
    Button: Button.extend({
      styles: (theme, props) => ({
        label: {
          color: props.variant === 'outline' ? theme.primaryColor : theme.white,
          fontWeight: 700,
        },
      }),
    }),
    Input: Input.extend({
      styles: (theme) => ({
        input: {
          borderColor: theme.colors.gray[5],
          '--_input-placeholder-color': theme.colors.gray[5],
        },
      }),
    }),
  },
});
