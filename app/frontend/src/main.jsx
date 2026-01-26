import toast, { Toaster } from 'react-hot-toast';

import CssBaseline from '@mui/material/CssBaseline';

import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';
import { ThemeProvider } from '@mui/material/styles';

// import { coffeeTheme, deepBlueTheme, analyticsDarkTheme } from './theme.js';
import { rawCoffeeDarkTheme } from './themes/rawCoffeeDarkTheme.js';
import { appRoutes } from './router.jsx';

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={rawCoffeeDarkTheme}>
    <>
      <CssBaseline />
      <Toaster toastOptions={{ style: { zIndex: 999999 } }} />
      <RouterProvider router={appRoutes} />
    </>
  </ThemeProvider>,
);
