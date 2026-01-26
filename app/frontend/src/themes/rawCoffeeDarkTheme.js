import { createTheme } from "@mui/material/styles";

// --- Color Definitions for the Matte Charcoal Theme (Based on Image) ---
const charcoalBlack = "#191919"; // Very dark, near-black matte background
const darkGraySurface = "#292929"; // Slightly lighter gray for cards/surfaces
const primaryAccent = "#FF5722"; // Vibrant Orange/Red (like the logo 'O')
const secondaryAccent = "#E0E0E0"; // Light gray for inactive text/icons
const whiteText = "#FFFFFF"; // Pure white for headings and main text

// --- Custom Theme Definition ---
export const rawCoffeeDarkTheme = createTheme({
  // ... (palette, typography, shape remain the same) ...
  palette: {
    mode: "dark",
    primary: {
      main: primaryAccent,
      light: "#FF8A50",
      dark: "#C43E00",
      contrastText: whiteText,
    },
    secondary: {
      main: secondaryAccent,
      light: "#FFFFFF",
      dark: "#BDBDBD",
      contrastText: charcoalBlack,
    },
    background: {
      default: charcoalBlack,
      paper: darkGraySurface,
    },
    text: {
      primary: whiteText,
      secondary: secondaryAccent,
      disabled: "rgba(255, 255, 255, 0.4)",
    },
    divider: "rgba(255, 255, 255, 0.12)",
  },
  typography: {
    fontFamily: ['"Inter", "Roboto", "Helvetica", "Arial", sans-serif'].join(
      ",",
    ),
    h6: { fontSize: "1rem", fontWeight: 600, color: whiteText },
    body1: { color: whiteText },
    button: { fontWeight: 600, textTransform: "none" },
  },
  shape: {
    borderRadius: 10,
  },

  // 4. COMPONENT OVERRIDES
  components: {
    // Global Styles, including the custom scrollbar rules
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        body: {
          backgroundColor: charcoalBlack,
        },

        // 💥 INJECTION POINT FOR CUSTOM SCROLLBAR STYLES 💥
        // These styles will apply to any element that uses a scrollbar
        "&::-webkit-scrollbar": {
          height: "8px",
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: theme.palette.background.default, // Dark background track
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: theme.palette.secondary.main + "40", // Light gray thumb with transparency
          borderRadius: "4px",
          "&:hover": {
            backgroundColor: theme.palette.primary.main, // Orange/Red on hover
          },
        },
        // END SCROLLBAR STYLES
      }),
    },

    // ... (MuiPaper, MuiButton, MuiOutlinedInput, MuiListItemButton remain the same) ...
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: darkGraySurface,
          borderRadius: 12,
          backgroundImage: "none",
          border: `1px solid ${charcoalBlack}`,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "8px 20px",
        },
        containedPrimary: {
          color: whiteText,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: charcoalBlack,
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: primaryAccent,
          },
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: darkGraySurface,
          },
        },
        input: {
          color: whiteText,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          "&:hover": {
            backgroundColor: primaryAccent + "20",
          },
          "&.Mui-selected": {
            backgroundColor: primaryAccent + "40",
            color: whiteText,
            fontWeight: 600,
          },
        },
      },
    },
  },
});
