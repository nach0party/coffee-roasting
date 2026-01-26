import { createBrowserRouter } from 'react-router';

// Internal app routes
// import { CoffeeRoastingDashboard } from './pages/dashboard/dashboard.jsx';
import { BeanSelection } from './pages/bean/selection/selection.jsx';
import { ManageRoast } from './pages/roast/manage.jsx';
import { BeanLibrary } from './pages/bean/library/library.jsx';
import { CoffeeRoastingDashboardV2 } from './pages/dashboard/dashboardv2.jsx';

export const appRoutes = createBrowserRouter([
  {
    path: '/',
    element: <CoffeeRoastingDashboardV2 />,
  },
  {
    path: '/bean/select',
    element: <BeanSelection />,
  },
  {
    path: '/bean/library',
    element: <BeanLibrary />,
  },
  {
    path: '/roast/:id',
    element: <ManageRoast />,
  },
]);
