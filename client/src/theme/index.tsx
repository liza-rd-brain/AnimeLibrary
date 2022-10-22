import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

declare module "@mui/material/styles/createPalette" {
  interface PalletItem {
    medium?: string;
  }

  interface Palette {
    component: PalletItem;
  }

  interface PaletteOptions {
    component?: PalletItem;
  }
}

const themeOptions = {
  palette: {
    primary: {
      main: "#7000E3",
      medium: "#6000C2",
      dark: "#490094",
      light: "#D8B7FA",
      line: "#ECEAFA",
      background: "#F8F5FB",
    },
  },
} as const;

declare module "@mui/material/styles" {
  interface Theme {
    palette: typeof themeOptions["palette"];
  }
}

export const theme = createTheme(themeOptions);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

// export function makeStyles<Theme = CustomTheme, Props extends object = {}, ClassKey extends string = string>(
//   styles: Styles<Theme, Props, ClassKey>,
//   options?: Omit<WithStylesOptions<Theme>, 'withTheme'>
// ) {
//   return makeCoreStyles<Theme, Props, ClassKey>(styles, options);
// }
