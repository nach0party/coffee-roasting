import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import { ThemeProvider } from "@mui/material/styles";

// TODO avoid relative imports
// Internal app routes
import { BeanPage } from "./pages/beans.jsx";
import { CoffeeRoastingDashboard } from "./pages/dashboard.jsx";
import { coffeeTheme, deepBlueTheme } from "./theme.js";
import { BeanSelection } from "./pages/roasting/beanSelection.jsx";
import CssBaseline from "@mui/material/CssBaseline";

// TODO change the component names...
const router = createBrowserRouter([
  {
    path: "/",
    element: <CoffeeRoastingDashboard />,
  },
  { path: "/beans", element: <BeanPage /> },
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
  <ThemeProvider theme={deepBlueTheme}>
    <CssBaseline />
    <RouterProvider router={router} />
  </ThemeProvider>
);
