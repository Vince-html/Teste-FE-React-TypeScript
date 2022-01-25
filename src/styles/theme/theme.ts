import { createTheme, CustomTheme } from '@mui/material';

export const theme = createTheme({
  colors: {
    primary200: '#17A2B8',
    primary500: '#007ACC',
    primary700: '#005C99',
    primary900: '#2F528F',

    // secondary colors

    secondary500: '#F6E023',

    // helpers colors

    darkBlue500: '#475C62',
    darkBlue900: '#324850',

    // text

    text900: '#303030',
    text500: '#8A8A8A',
    text200: '#E9EBF5',
    text50: '#FAFAFA',
  },

  fontSize: {
    runt: '0.8rem',
    small: '1.2rem',
    medium: '1.8rem',
    large: '2.4rem',
    largeX: '2.8rem',
    big: '3.2rem',
    bigX: '4.2rem',
    huge: '4.8rem',
  },

  fontWeight: {
    light: '300',
    regular: '400',
    medium: '500',
    bold: '700',
    extraBold: '900',
  },
} as CustomTheme);
