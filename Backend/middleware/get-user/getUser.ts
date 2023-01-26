import { NextFunction, Request, Response } from 'express';

import HttpError from '../../helper/error/http-error.js';
import { User } from '../../models/index.js';
import { UserInterface } from '../../models/user/user.model.js';

export const userExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = res.locals;

  let user: UserInterface | null;
  try {
    user = await User.findById(userId);
  } catch (error) {
    const err = new HttpError('خطا در برقراری ارتباط', 500);
    return next(err);
  }
  if (!user) {
    const err = new HttpError('کاربری یافت نشد', 400);
    return next(err);
  }

  res.locals.user = user;

  next();
};
