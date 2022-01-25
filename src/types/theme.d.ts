import { Theme, ThemeOptions } from '@mui/material';

declare module '@mui/material/styles' {
  interface ThemeOptionsCustom extends ThemeOptions {
    colors: {
      primary200: string;
      primary500: string;
      primary700: string;
      primary900: string;
      secondary500: string;
      darkBlue500: string;
      darkBlue900: string;
      text900: string;
      text500: string;
      text200: string;
      text50: string;
    };

    fontSize: {
      runt: string;
      small: string;
      medium: string;
      large: string;
      largeX: string;
      big: string;
      bigX: string;
      huge: string;
    };

    fontWeight: {
      light: string;
      regular: string;
      medium: string;
      bold: string;
      extraBold: string;
    };
  }

  interface CustomTheme extends Theme {
    colors: {
      primary200: string;
      primary500: string;
      primary700: string;
      primary900: string;
      secondary500: string;
      darkBlue500: string;
      darkBlue900: string;
      text900: string;
      text500: string;
      text200: string;
      text50: string;
    };

    fontSize: {
      runt: string;
      small: string;
      medium: string;
      large: string;
      largeX: string;
      big: string;
      bigX: string;
      huge: string;
    };

    fontWeight: {
      light: string;
      regular: string;
      medium: string;
      bold: string;
      extraBold: string;
    };
  }
  export default function createTheme(
    options?: ThemeOptionsCustom,
    ...args: object[]
  ): CustomTheme;
}
