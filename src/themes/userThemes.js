import { createTheme } from "@mui/material/styles";
export const defaultTheme = createTheme();
export const paquerTheme = createTheme({
  palette: {
    // mode: "light",
    primary: {
      main: "#2e7d32",
    },
    secondary: {
      main: "#d81b60",
    },
  },
});
