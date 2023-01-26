import express from 'express';

import {
  isUserLoggedIn,
  loginUser,
  logout,
  registerUser,
} from '../../controllers/auth.controller.js';
import validation from '../../validations/index.js';

const router = express.Router();

router.route('/').get(isUserLoggedIn).delete(logout);

router.post('/login', validation.authValidation.loginUserValidate, loginUser);
router.post('/register', registerUser);

export default router;
