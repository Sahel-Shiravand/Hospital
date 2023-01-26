import { yupResolver } from '@mantine/form';
import { FormValidateInput } from '@mantine/form/lib/types';
import * as yup from 'yup';

export const loginSchema: {
  initialValues: {
    email: string;
    password: string;
    remember: boolean;
  };
  validate: FormValidateInput<Record<string, unknown>>;
  validateInputOnBlur: boolean;
  // validateInputOnChange: string[];
} = {
  initialValues: {
    email: '',
    password: '',
    remember: false,
  },
  validate: yupResolver(
    yup.object({
      email: yup
        .string()
        .email('ایمیل وارد شده نامعتبر می‌باشد')
        .required('تکمیل این فیلد الزامی است'),
      password: yup
        .string()
        .required()
        .min(8, 'رمز عبور باید حداقل 8 کاراکتر باشد')
        .max(64, 'رمز عبور باید حداکثر 64 کاراکتر باشد'),
    })
  ),
  validateInputOnBlur: true,
  // validateInputOnChange: ['password'],
};
