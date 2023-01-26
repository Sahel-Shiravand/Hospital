import { NextFunction, Request, Response } from 'express';

import HttpError from '../../helper/error/http-error.js';
import { User } from '../../models/index.js';

export const authCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    req.session?.cookie.expires &&
    req.session.cookie.expires > new Date() &&
    req.session.userId
  ) {
    const { userId } = req.session;
    let user;
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
    res.locals.user = user;
    next();
  } else {
    res.status(403).json({
      isAuth: false,
      user: null,
    });
  }
};
