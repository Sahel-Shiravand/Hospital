import Login from '../pages/Login';
// import Register from '@/pages/Register';
import { createBrowserRouter, Navigate } from 'react-router-dom';

export const globalRoutes = createBrowserRouter([
  {
    path: 'login',
    element: <Login />,
  },
  // {
  //   path: 'register',
  //   element: <Register />,
  // },
  {
    path: '*',
    element: <Navigate to='login' replace />,
  },
]);
