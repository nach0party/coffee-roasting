import toast, { Toaster } from "react-hot-toast";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import { ThemeProvider } from "@mui/material/styles";
import { coffeeTheme, deepBlueTheme, analyticsDarkTheme } from "./theme.js";
import CssBaseline from "@mui/material/CssBaseline";

// Internal app routes
// import { ManageBean } from "./pages/bean/manage.jsx";
import { CoffeeRoastingDashboard } from "./pages/dashboard/dashboard.jsx";
import { BeanSelection } from "./pages/bean/selection/selection.jsx";
import { ManageRoast } from "./pages/roast/manage.jsx";
import { BeanLibrary } from "./pages/bean/library/library.jsx";
import { rawCoffeeDarkTheme } from "./themes/rawCoffeeDarkTheme.js";

// TODO consider changing / organizing the paths, this works for now but what's the best way to organize some of these?
// TODO change the component names...
const router = createBrowserRouter([
  {
    path: "/",
    element: <CoffeeRoastingDashboard />,
  },
  {
    path: "/bean/select",
    element: <BeanSelection />,
  },
  {
    path: "/bean/library",
    element: <BeanLibrary />,
  },
  {
    path: "/roast/:id",
    element: <ManageRoast />,
  },
]);

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={rawCoffeeDarkTheme}>
    <>
      <CssBaseline />
      <Toaster toastOptions={{ style: { zIndex: 999999 } }} />
      <RouterProvider router={router} />
    </>
  </ThemeProvider>
);
