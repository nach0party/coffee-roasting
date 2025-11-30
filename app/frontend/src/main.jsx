import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import { ThemeProvider } from "@mui/material/styles";

// TODO avoid relative imports
// Internal app routes
import { ManageBean } from "./pages/bean/manage.jsx";
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
  // both of thse can probably just be /bean/:id
  { path: "/bean/add", element: <ManageBean /> },
  { path: "/bean/:id", element: <ManageBean /> },
  {
    path: "/bean/select",
    element: <BeanSelection />,
  },
  // continue the roast....
  {
    path: "/roast/:id",
    element: <div>Starting / continuing a roast!</div>,
  },
]);

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={analyticsDarkTheme}>
    <CssBaseline />
    <RouterProvider router={router} />
  </ThemeProvider>
);
