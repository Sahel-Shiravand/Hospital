import { NextFunction, Request, Response } from 'express';
import HttpError from '../helper/error/http-error.js';

const catchAsync =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      
      const err = new HttpError(
        error.message || 'خطا در برقراری ارتباط',
        error.code || 500
      );
      next(err);
    });
  };

export default catchAsync;
