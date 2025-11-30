import { styled } from "@mui/material/styles";
import TableContainer from "@mui/material/TableContainer";

/**
 * Provides a basic theme injected and styled custom
 * table component for use across the application.
 */
export const CoffeeTableContainer = styled(TableContainer)(({ theme }) => ({
  // backgroundColor: theme.palette.primary.light,
  // color: theme.palette.primary.contrastText,
  padding: theme.spacing(3),
  margin: theme.spacing(2, "auto"),
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(2),
  },
  borderRadius: 8,
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
}));
