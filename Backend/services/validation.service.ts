import { NextFunction, Request } from 'express';
import { validationResult } from 'express-validator';

import HttpError from '../helper/error/http-error.js';

const validateRequest = (req: Request, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new HttpError(errors.array()[0].msg, 400);
    return next(err);
  }
};

export default validateRequest;
