// import { acceptableRoles } from '@/security/acceptableRoles';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// import Account from '../pages/Dashboard/Account';
// import Dashboard from '../pages/Dashboard/Dashboard/Dashboard';
// import Home from '../pages/Dashboard/Home';
// const Account = lazy(() => import('../pages/Dashboard/Account'));
// const Home = lazy(() => import('../pages/Dashboard/Home'));
// const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard/Dashboard'));

export const privateRoutes = createBrowserRouter([
  {
    path: 'dashboard',
    element: (
      <div className='text-4xl font-bold text-center'>
        private
      </div>
    ),
  },
  {
    path: '*',
    element: <Navigate to='dashboard' replace />,
  },
]);
