import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import { ThemeProvider } from "@mui/material/styles";

// TODO avoid relative imports
// Internal app routes
import { AddBean } from "./pages/bean/add.jsx";
import { CoffeeRoastingDashboard } from "./pages/dashboard.jsx";
import { coffeeTheme, deepBlueTheme, analyticsDarkTheme } from "./theme.js";
import { BeanSelection } from "./pages/roasting/beanSelection.jsx";
import CssBaseline from "@mui/material/CssBaseline";

// TODO consider changing / organizing the paths, this works for now but what's the best way to organize some of these?
// TODO change the component names...
const router = createBrowserRouter([
  {
    path: "/",
    element: <CoffeeRoastingDashboard />,
  },
  { path: "/bean/add", element: <AddBean /> },
  {
    path: "/bean/selection",
    element: <BeanSelection />,
  },
  {
    path: "/roasting/:id",
    element: <div>test</div>,
  },
]);

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={analyticsDarkTheme}>
    <CssBaseline />
    <RouterProvider router={router} />
  </ThemeProvider>
);
