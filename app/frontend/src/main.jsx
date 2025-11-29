import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

// Internal app routes
import { BeanPage } from "./pages/beans.jsx";
import { CoffeeRoastingDashboard } from "./pages/dashboard.jsx";
import { CoffeeRoasting } from "./pages/roasting.jsx";

import "./index.css";

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

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
