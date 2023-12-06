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
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: '#fff',
          }
        }
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
