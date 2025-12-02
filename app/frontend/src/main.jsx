import toast, { Toaster } from "react-hot-toast";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import { ThemeProvider } from "@mui/material/styles";
import { coffeeTheme, deepBlueTheme, analyticsDarkTheme } from "./theme.js";
import CssBaseline from "@mui/material/CssBaseline";

// Internal app routes
import { ManageBean } from "./pages/bean/manage.jsx";
import { CoffeeRoastingDashboard } from "./pages/dashboard.jsx";
import { BeanSelection } from "./pages/bean/selection.jsx";
import { ManageRoast } from "./pages/roast/manage.jsx";

// TODO consider changing / organizing the paths, this works for now but what's the best way to organize some of these?
// TODO change the component names...
const router = createBrowserRouter([
  {
    path: "/",
    element: <CoffeeRoastingDashboard />,
  },
  { path: "/bean/add", element: <ManageBean /> },
  { path: "/bean/:id", element: <ManageBean /> },
  {
    path: "/bean/select",
    element: <BeanSelection />,
  },
  {
    path: "/roast/:id",
    element: <ManageRoast />,
  },
]);

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={analyticsDarkTheme}>
    <>
      <CssBaseline />
      <Toaster toastOptions={{ style: { zIndex: 999999 } }} />
      <RouterProvider router={router} />
    </>
  </ThemeProvider>
);
