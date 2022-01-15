import { createStitches } from "@stitches/react";

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      primary: "#4169e1",
      secondary: "#75aadb",
      accent: "#fcbf49",

      success: "#5fa",
      info: "#5af",
      alert: "#fa5",
      error: "#f55",

      darker: "#111",
      dark: "#333",
      grey: "#555",
      light: "#aaa",
      lighter: "#eee",
    },
    shadows: {
      darker: "#111",
      dark: "#333",
      grey: "#555",
      light: "#aaa",
      lighter: "#eee",
    },
  },
  utils: {
    // size
    size: (value) => ({ width: value, height: value }),
    br: (value) => ({ borderRadius: value }),

    m: (value) => ({ margin: value }),
    mt: (value) => ({ marginTop: value }),
    mr: (value) => ({ marginRight: value }),
    mb: (value) => ({ marginBottom: value }),
    ml: (value) => ({ marginLeft: value }),
    mx: (value) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value) => ({
      marginTop: value,
      marginBottom: value,
    }),

    // display
    align: (value) => ({ alignItems: value }),
    justify: (value) => ({ justifyContent: value }),

    // theme
    bg: (background) => ({ background }),
    shadow: (value) => ({ boxShadow: value }),
    linearGradient: (value) => ({ bg: `linear-gradient(${value})` }),

    // utils
    onhover: (value) => ({ "&:hover": value }),
    onfocus: (value) => ({ "&:focus": value }),
    ondark: (value) => ({ "[data-theme=dark] &": value }),
  },
});
