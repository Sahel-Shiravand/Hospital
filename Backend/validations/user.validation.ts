import { check } from 'express-validator';

const updateProfileValidate = [
  check('firstName')
    .not()
    .isEmpty()
    .withMessage('نام نباید خالی باشد')
    .trim()
    .isLength({ min: 2, max: 20 })
    .withMessage('مقدار نام باید حداقل 2 و حداکثر 20 کاراکتر باشد'),
  check('lastName')
    .not()
    .isEmpty()
    .withMessage('نام خانوادگی نباید خالی باشد')
    .trim()
    .isLength({ min: 2, max: 20 })
    .withMessage('مقدار نام خانوادگی باید حداقل 2 و حداکثر 20 کاراکتر باشد'),
  check('email')
    .not()
    .isEmpty()
    .withMessage('مقدار ایمیل نباید خالی باشد')
    .isEmail()
    .withMessage('ایمیل وارد شده صحیح نمی باشد'),
];

const changePasswordValidate = [
  check('currentPassword')
    .trim()
    .isLength({
      min: 8,
    })
    .withMessage('رمز عبور باید حداقل 8 کاراکتر باشد'),
  check('newPassword')
    .trim()
    .isLength({
      min: 8,
    })
    .withMessage('رمز عبور باید حداقل 8 کاراکتر باشد')
    .custom((value, { req }) => {
      if (value === req.body.currentPassword) {
        throw new Error('رمز عبور جدید نباید با رمز عبور فعلی یکسان باشد');
      }
      return true;
    }),
  check('confirmNewPassword', 'رمز عبور وارد شده مطابقت ندارد')
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('رمز عبور وارد شده مطابقت ندارد');
      }
      return true;
    }),
];

export default { updateProfileValidate, changePasswordValidate };
