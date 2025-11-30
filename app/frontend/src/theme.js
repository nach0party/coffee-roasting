import { createTheme } from "@mui/material/styles";

const rawCoffeeBrown = "#3e2723"; // Very Dark Brown (Near Black)
const cremaGold = "#FFCC80"; // Light Gold/Cream for accents
const warmBeige = "#F5F5DC"; // Soft background color

// --- Vision UI Dashboard Color Palette ---
const visionColors = {
  primary: {
    main: '#7551FF', // Deep Indigo/Purple
    light: '#8d73ff',
    dark: '#583dc2',
    gradient: 'linear-gradient(83.56deg, #7551FF 26.66%, #F54992 78.08%)',
  },
  secondary: {
    main: '#F54992', // Vibrant Pink/Red Accent
    light: '#f76aab',
    dark: '#b3356a',
  },
  background: {
    default: '#080B25', // Very Dark Indigo/Black
    paper: '#101744',   // Slightly lighter for cards/surfaces
    // ADDED: The custom radial gradient using the default background color
    radialGradient: 'radial-gradient(circle at center, rgba(16, 23, 68, 0.2) 0%, #080B25 60%)',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#A0AEC0', // Light Gray for secondary text
  },
  success: {
    main: '#00A96B', // Vibrant Green
  },
};

// --- Custom Theme Definition ---
export const deepBlueTheme = createTheme({
  // 1. PALETTE (Colors and Dark Mode Settings)
  palette: {
    mode: 'dark',
    primary: visionColors.primary,
    secondary: visionColors.secondary,
    background: visionColors.background,
    text: visionColors.text,
    success: visionColors.success,
    divider: 'rgba(255, 255, 255, 0.12)',
  },

  // 2. TYPOGRAPHY (Font and Text Styles)
  typography: {
    fontFamily: ['"Inter", sans-serif'].join(','),
    h1: { fontSize: '2.5rem', fontWeight: 700, color: visionColors.text.primary },
    h2: { fontSize: '2rem', fontWeight: 600, color: visionColors.text.primary },
    h6: { fontSize: '1rem', fontWeight: 500, color: visionColors.text.primary },
    body1: { color: visionColors.text.secondary },
  },

  shape: {
    borderRadius: 16,
  },

  components: {
    // This doesn't work
    MuiCssBaseline: {
      styleOverrides: {
        body: {

          minHeight: '100vh',
          backgroundColor: visionColors.background.default,
          background: visionColors.background.radialGradient,
        }
      }
    },

    // Customize the main surface (Paper/Card)
    MuiPaper: {
      defaultProps: {
        elevation: 6, // Subtle elevation
      },
      styleOverrides: {
        root: {
          backgroundColor: visionColors.background.paper, // Use the slightly lighter dark background
          borderRadius: 16, // Apply high border radius
          backgroundImage: 'none', // Remove default MUI dark mode gradient if present
        },
      },
    },


    // Customize Buttons for the Gradient Look
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          borderRadius: 12,
          textTransform: 'none',
          padding: '10px 24px',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
          ...(ownerState.variant === 'contained' && ownerState.color === 'primary' && {
            // Apply the custom gradient background
            background: visionColors.primary.gradient,
            color: '#FFFFFF',
            '&:hover': {
              opacity: 0.9,
              background: visionColors.primary.gradient, // Ensure gradient remains on hover
            },
          }),
        }),
      },
    },

    // Customize TextField/Input fields
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: visionColors.primary.main,
          },
        },
        notchedOutline: {
          borderColor: visionColors.text.secondary + '33', // Subtle border
        }
      }
    },

    // Customize the main body background
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: visionColors.background.default,
        }
      }
    }
  },
});

// TODO actually go through and customize this at some point
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

// --- Analytics Dashboard Dark Color Palette ---
const analyticsColors = {
  // Deep Blue/Black for the canvas
  background: {
    default: '#0A1929', // Very dark background
    paper: '#132F4C',   // Lighter, deep blue for cards and surfaces
  },
  // Vibrant Blue for primary elements (charts, buttons)
  primary: {
    main: '#00BFFF', // Sky Blue/Deep Cyan
    light: '#66DFFF',
    dark: '#009ACD',
  },
  // Secondary color for accents (e.g., secondary charts) - often a warm contrast
  secondary: {
    main: '#FFB74D', // Amber/Orange
  },
  // Status Colors (Green for Growth, Red for Decline)
  success: {
    main: '#00E396', // Neon Green
  },
  error: {
    main: '#FF4560', // Vibrant Red
  },
  // Text Colors
  text: {
    primary: '#FFFFFF',     // Pure white for major titles
    secondary: '#9EAFB8',   // Soft light gray/blue for body text and labels
    disabled: 'rgba(255, 255, 255, 0.3)',
  },
  divider: 'rgba(255, 255, 255, 0.1)',
};

// --- Custom Theme Definition ---
export const analyticsDarkTheme = createTheme({
  // 1. PALETTE (Colors and Dark Mode Settings)
  palette: {
    mode: 'dark',
    ...analyticsColors,
  },

  // 2. TYPOGRAPHY
  typography: {
    fontFamily: ['"Inter", "Roboto", "Helvetica", "Arial", sans-serif'].join(','),
    h4: {
      fontWeight: 600, // Slightly bolder headings
    },
    h5: {
      fontWeight: 500,
    },
  },

  // 3. SHAPE (Small radius for professional look)
  shape: {
    borderRadius: 8,
  },

  // 4. COMPONENTS (Overrides for global and component styles)
  components: {
    // Apply the very dark blue/black background globally
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: analyticsColors.background.default,
        }
      }
    },

    // Customize Cards (Paper)
    MuiPaper: {
      defaultProps: {
        elevation: 6, // Subtle 3D lift
      },
      styleOverrides: {
        root: {
          backgroundColor: analyticsColors.background.paper, // Lighter blue-black surface
          // Setting up a very subtle border, typical for these themes
          border: `1px solid ${analyticsColors.divider}`,
          boxShadow: 'none', // Rely on the border and background contrast
        },
      },
    },

    // Customize Buttons 
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
          padding: '8px 20px',
        },
      },
    },

    // Customize Chip for status labels
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
        // Custom styling for the 'Online' look
        colorPrimary: {
          backgroundColor: analyticsColors.success.main + '20', // Light background tint
          color: analyticsColors.success.main, // Neon Green text
        },
        // Custom styling for the 'Offline'/'Default' look
        colorSecondary: {
          backgroundColor: analyticsColors.text.secondary + '20',
          color: analyticsColors.text.secondary,
        }
      }
    },

    // Customize Icons to use the secondary text color by default
    MuiSvgIcon: {
      defaultProps: {
        color: 'inherit',
      },
      styleOverrides: {
        root: {
          color: analyticsColors.text.secondary,
        }
      }
    }
  },
});