import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#f5f5f5",
          200: "#e0e0e0",
          300: "#bdbdbd",
          400: "#9e9e9e",
          500: "#757575",
          600: "#616161",
          700: "#424242",
          800: "#303030",
          900: "#212121",
        },
        primary: {
          100: "#cfd8dc",
          200: "#90a4ae",
          300: "#607d8b",
          400: "#455a64",
          500: "#263238",
          600: "#1e272e",
          700: "#151d23",
          800: "#10171c",
          900: "#0b0f12",
        },
        greenAccent: {
          100: "#ccffec",
          200: "#99ffda",
          300: "#66ffbf",
          400: "#33ff99",
          500: "#00ff66",
          600: "#00cc52",
          700: "#00993d",
          800: "#006626",
          900: "#00330f",
        },
        blueAccent: {
          100: "#d0e7ff",
          200: "#a1cfff",
          300: "#72b7ff",
          400: "#439fff",  
          500: "#0e7fff",
          600: "#0b66cc",
          700: "#094d99",
          800: "#063366",  
          900: "#031a33",
        },
      }
    : {
        grey: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        primary: {
          100: "#f2f0f0",  
          200: "#e0e0e0",
          300: "#a1a4ab",
          400: "#1F2A40",  
          500: "#141b2d",
          600: "#1F2A40",
          700: "#727681",
          800: "#a1a4ab",
          900: "#d0d1d5",
        },
        greenAccent: {
          100: "#1f473d",
          200: "#1e5245",
          300: "#2e7c67",
          400: "#3da58a",
          500: "#4cceac",
          600: "#70d8bd",
          700: "#94e2cd",
          800: "#b7ebde",
          900: "#dbf5ee",
        },
        blueAccent: {
          100: "#151632",
          200: "#2a2d64",
          300: "#3e4396",
          400: "#535ac8",
          500: "#6870fa",
          600: "#868dfb",
          700: "#a4a9fc",
          800: "#c3c6fd",
          900: "#e1e2fe",
        },
      }),
});

export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.greenAccent[100],
            },
            background: {
              default: colors.primary[900],
              paper: colors.primary[200],  
            },
            neutral: {
              dark: colors.grey[100],
              main: colors.grey[500],
              light: colors.grey[100],
            },
          }
        : {
            primary: {
              main: colors.primary[400],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            background: {
              default: colors.primary[100],
              paper: "#f2f0f0",  
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
          }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      button: {
        textTransform: "none",
      },
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};


// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
