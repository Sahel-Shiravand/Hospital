import { check } from 'express-validator';

const loginUserValidate = [
  check('email')
    .not()
    .isEmpty()
    .withMessage('مقدار ایمیل نباید خالی باشد')
    .isEmail()
    .withMessage('ایمیل وارد شده صحیح نمی باشد'),
  check('password')
    .isLength({ min: 8 })
    .withMessage('رمز عبور باید حداقل 8 کاراکتر باشد'),
];

export default { loginUserValidate };
