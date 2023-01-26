import express from 'express';

// import config from '../../config/config.js';
// import { authCheck } from '../../middleware/auth/authCheck.js';
import authRoute from './auth.route.js';
// import docsRoute from './docs.route.js';
// import userRoute from './user.route.js';

const router = express.Router();

const defaultRoutes = [
  // {
  //   path: '/user',
  //   route: [authCheck, userRoute],
  // },
  {
    path: '/auth',
    route: authRoute,
  },
];

// const devRoutes = [
  // {
  //   path: '/docs',
  //   route: docsRoute,
  // },
// ];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

// if (config.env === 'development') {
//   devRoutes.forEach((route) => {
//     router.use(route.path, route.route);
//   });
// }

export default router;
