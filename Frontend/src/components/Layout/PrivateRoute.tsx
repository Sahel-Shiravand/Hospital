/* eslint-disable id-length */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useStore } from '../../store';
// import _ from 'lodash';
import { Navigate } from 'react-router-dom';

const PrivateRoute: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const role = useStore((state) => state.user.role);

  // const isAllowed = _.intersection(acceptableRoles, roles).length > 0;
  const isAllowed = role === 'admin';

  if (isAllowed) return <>{children}</>;

  return <Navigate to='/' replace />;
};

export default PrivateRoute;

// const PrivateRoutes: React.FC<{
//   children: React.ReactNode;
//   [key: string]: any;
// }> = ({ children, ...rest }) => {

//   return <Route {...rest}>{children}</Route>;
// };
