import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

import HttpError from '../helper/error/http-error.js';
import { User } from '../models/index.js';
import { UserInterface } from '../models/user/user.model.js';
import validateRequest from '../services/validation.service.js';
import catchAsync from '../utils/catchAsync.js';

// @desc    isUserLoggedIn User
// @route   GET /api/v1/auth
// @access  Public
const isUserLoggedIn = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (
      req.session?.cookie?.expires &&
      req.session.cookie.expires > new Date() &&
      req.session.userId
    ) {
      const { userId } = req.session;
      let user: UserInterface | null = null;
      try {
        user = await User.findById(userId);
      } catch (error) {
        const err = new HttpError('خطایی رخ داده است', 500);
        return next(err);
      }
      if (!user) {
        const err = new HttpError('کاربری یافت نشد', 404);
        return next(err);
      }
      res.status(200).json({
        isAuth: true,
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          avatar: user.avatar,
          roles: user.role,
        },
      });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      req.session.destroy((err: any) => {
        if (err) {
          const error = new HttpError('خطایی رخ داده است', 500);
          return next(error);
        }
      });
      res.clearCookie('connect.sid');
      res.status(200).json({
        isAuth: false,
        user: null,
      });
    }
  }
);

// @desc    Login User
// @route   POST /api/v1/user/login
// @access  Public
const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    validateRequest(req, next);
    const {
      email,
      password,
    }: {
      email: string;
      password: string;
    } = req.body;
    const user: UserInterface | null = await User.findOne({
      email: email.trim().toLowerCase(),
    });
    if (!user || !(await user.isPasswordMatch(password)))
      throw new HttpError('نام کاربری یا رمز عبور اشتباه است', 400);

    req.session.userId = String(user._id);
    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      avatar: user.avatar,
      roles: user.role,
    });
  }
);
// @desc    Register User
// @route   POST /api/v1/user/login
// @access  Public
const registerUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new HttpError(errors.array()[0].msg, 400);
      return next(err);
    }

    const {
      firstName,
      lastName,
      email,
      password,
    }: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    } = req.body;

    let user: UserInterface | null;
    try {
      user = await User.findOne({ email });
    } catch (error) {
      const err = new HttpError('کاربری با این ایمیل یاف نشد', 400);
      return next(err);
    }
    if (user) {
      const err = new HttpError('ایمیل قبلا در سیستم ثبت شده', 400);
      return next(err);
    }

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 12);
    } catch (error) {
      const err = new HttpError(`${error}`, 400);
      return next(err);
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    try {
      await newUser.save();
    } catch (error) {
      const err = new HttpError('خطا در برقراری ارتباط', 500);
      return next(err);
    }

    res.status(201).json({
      message: 'کاربر با موفقیت ثبت شد',
      user: {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
    });
  }
);

// @desc    Logout User
// @route   POST /api/v1/user/logout
// @access  Public
const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    req.session.destroy((err) => {
      if (err) {
        const error = new HttpError('خطا در برقراری ارتباط', 500);
        return next(error);
      }
    });
    res.clearCookie('connect.sid');
    res.status(200).end();
  }
);

export { loginUser, registerUser, logout, isUserLoggedIn };
