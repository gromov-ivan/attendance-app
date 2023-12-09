import { ThemeOptions } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';

import { Themes } from './types';

const sharedTheme = {
  palette: {
    background: {
      default: '#fafafa',
      paper: '#fff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        outlined: {

        },
        contained: {
          color: '#fff',
          backgroundColor: '#ff7433',
          '&:hover': {
            backgroundColor: '#ff621a',
          },
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableTouchRipple: false,
      },
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: '#fff',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          '&:hover': {
            backgroundColor: '#fff',
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        vertical: {
          marginRight: 10,
          marginLeft: 10,
        },
        middle: {
          marginTop: 10,
          marginBottom: 10,
          width: '80%',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        asterisk: {
          color: "#d32f2f",
          fontSize: "1.1rem",
        },
      },
    },
  },
} as ThemeOptions;

const themes: Record<Themes, ThemeOptions> = {
  light: deepmerge(sharedTheme, {
    palette: {
      mode: 'light',
      text: {
        primary: '#000000',
      },
      background: {
        default: '#ffffff',
        paper: '#f2f2f2',
      },
      primary: {
        main: '#ff854d',
      },
      secondary: {
        main: '#f2f2f2',
      },
      accent: {
        main: '#53565a',
      },
    },
  }),

  dark: deepmerge(sharedTheme, {
    palette: {
      mode: 'light',
      text: {
        primary: '#000000',
      },
      background: {
        default: '#ffffff',
        paper: '#f2f2f2',
      },
      primary: {
        main: '#ff854d',
      },
      secondary: {
        main: '#f2f2f2',
      },
      accent: {
        main: '#53565a',
      },
    },
  }),
};

export default themes;
