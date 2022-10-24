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
      main: "#317cec",
      medium: "#2d70d6",
      dark: "#2256a4",
      light: "#4d8eef",
      line: "#afcefe",
      background: "#ffffff",
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
