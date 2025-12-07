import { createTheme } from "@mui/material/styles";

// --- Color Definitions for the Matte Charcoal Theme (Based on Image) ---
const charcoalBlack = "#191919"; // Very dark, near-black matte background
const darkGraySurface = "#292929"; // Slightly lighter gray for cards/surfaces
const primaryAccent = "#FF5722"; // Vibrant Orange/Red (like the logo 'O')
const secondaryAccent = "#E0E0E0"; // Light gray for inactive text/icons
const whiteText = "#FFFFFF"; // Pure white for headings and main text

// --- Custom Theme Definition ---
export const rawCoffeeDarkTheme = createTheme({
  // 1. PALETTE (Colors and Dark Mode Settings)
  palette: {
    mode: 'dark',
    // Primary: Used for main buttons, focus elements, and the main accent color
    primary: {
      main: primaryAccent, // Vibrant Orange/Red
      light: "#FF8A50",
      dark: "#C43E00",
      contrastText: whiteText, 
    },
    // Secondary: Used for inactive states, dividers, and secondary actions
    secondary: {
      main: secondaryAccent, // Light Gray
      light: "#FFFFFF",
      dark: "#BDBDBD",
      contrastText: charcoalBlack,
    },
    // Background and Surface
    background: {
      default: charcoalBlack, // Very dark charcoal for the main canvas
      paper: darkGraySurface, // Slightly lighter gray for cards/surfaces
    },
    // Text Colors
    text: {
      primary: whiteText, // Pure white for high contrast
      secondary: secondaryAccent, // Light gray for secondary text/details
      disabled: 'rgba(255, 255, 255, 0.4)',
    },
    divider: 'rgba(255, 255, 255, 0.12)', // Subtle white divider
  },

  // 2. TYPOGRAPHY
  typography: {
    // Keeping a modern, clean font
    fontFamily: ['"Inter", "Roboto", "Helvetica", "Arial", sans-serif'].join(','),
    h6: { 
      fontSize: '1rem', 
      fontWeight: 600, 
      color: whiteText 
    },
    body1: { 
      color: whiteText 
    }, 
    button: {
      fontWeight: 600,
      textTransform: "none",
    },
  },

  // 3. SHAPE 
  shape: {
    // Matching the relatively high roundedness of the UI elements
    borderRadius: 10, 
  },

  // 4. COMPONENT OVERRIDES
  components: {
    // Global Body Background
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: charcoalBlack,
        }
      }
    },

    // Customize the main surface (Paper/Card)
    MuiPaper: {
      defaultProps: {
        elevation: 0, // Flat look
      },
      styleOverrides: {
        root: {
          backgroundColor: darkGraySurface, // Lighter surface gray
          borderRadius: 12, // High border radius
          backgroundImage: 'none', 
          // Optional: subtle inner border for definition, like in the image
          border: `1px solid ${charcoalBlack}`, 
        },
      },
    },
    
    // Customize Buttons
    MuiButton: {
      defaultProps: {
        disableElevation: true, 
      },
      styleOverrides: {
        root: {
          borderRadius: 8, 
          padding: '8px 20px',
        },
        // Primary button styling (Orange/Red)
        containedPrimary: {
            color: whiteText, 
        },
      },
    },

    // Customize TextField/Input fields
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          // Input fields match the dark gray surface or are slightly darker for definition
          backgroundColor: charcoalBlack, 
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: primaryAccent, // Orange/Red focus border
          },
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: darkGraySurface, // Subtle border
          },
        },
        input: {
          color: whiteText,
        },
      }
    },
    
    // Customizing the active sidebar items to use the Orange/Red accent
    MuiListItemButton: {
        styleOverrides: {
            root: {
                borderRadius: 8,
                '&:hover': {
                    backgroundColor: primaryAccent + '20', // Subtle accent hover
                },
                // Active/selected item styling (like 'New Origin' in the image)
                '&.Mui-selected': {
                    backgroundColor: primaryAccent + '40', // Brighter accent background
                    color: whiteText, // Ensure text stays white
                    fontWeight: 600,
                }
            }
        }
    }
  },
});