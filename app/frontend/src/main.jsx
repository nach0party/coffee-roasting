import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";

// Internal app routes
import { BeanPage } from "./pages/beans.jsx";
import { CoffeeRoastingDashboard } from "./pages/dashboard.jsx";
import { CoffeeRoasting } from "./pages/roasting.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CoffeeRoastingDashboard />,
  },
  { path: "/beans", element: <BeanPage /> },
  {
    path: "/roasting",
    element: <CoffeeRoasting />,
  },
]);

const rawCoffeeBrown = "#3e2723"; // Very Dark Brown (Near Black)
const cremaGold = "#FFCC80"; // Light Gold/Cream for accents
const warmBeige = "#F5F5DC"; // Soft background color

// 1. Define your custom theme (or use the default theme)
export const coffeeTheme = createTheme({
  // --- 1. PALETTE (Colors) ---
  palette: {
    // Primary: Used for main buttons, navigation, and focus elements.
    primary: {
      main: rawCoffeeBrown,
      light: "#6a4f4b", // Lighter shade for hover
      dark: "#2a1a17", // Darker shade for contrast
      contrastText: "#ffffff", // White text on dark brown
    },
    // Secondary: Used for accents, highlights (e.g., success metrics, "Roast Now" button)
    secondary: {
      main: cremaGold,
      light: "#FFFFB0",
      dark: "#C99D53",
      contrastText: rawCoffeeBrown, // Dark text on light gold
    },
    // Background and Surface
    background: {
      default: warmBeige, // Light, inviting page background
      paper: "#ffffff", // White for cards, drawers, and surfaces
    },
    // Text Colors
    text: {
      primary: rawCoffeeBrown, // Main text color
      secondary: "#6d4c41", // Muted, warm gray for captions/details
    },
    // Status colors
    success: {
      main: "#4CAF50", // Standard green for success metrics
    },
    error: {
      main: "#D32F2F", // Standard red for errors
    },
  },

  // --- 2. TYPOGRAPHY ---
  typography: {
    fontFamily: [
      "Merriweather", // A warm, readable serif font for headings
      "Roboto", // Standard sans-serif for body text
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      color: rawCoffeeBrown,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    button: {
      fontWeight: 600,
      textTransform: "none", // Keep button text natural, not all caps
    },
  },

  // --- 3. SPACING ---
  // MUI spacing is based on a factor of 8px.
  // spacing: 8, // This is the default, keeping it explicit

  // --- 4. COMPONENT OVERRIDES (Global Styles for Components) ---
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true, // No shadow for a modern look
      },
      styleOverrides: {
        root: {
          borderRadius: 8, // Slightly rounded corners
        },
        containedPrimary: {
          // Makes the primary buttons really stand out
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12, // More rounded, softer cards
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)", // Subtle card shadow
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          // Add a little space below inputs
          marginBottom: "16px",
        },
      },
    },
  },
});

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={coffeeTheme}>
    <RouterProvider router={router} />
  </ThemeProvider>
);
