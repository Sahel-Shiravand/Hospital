/* eslint-disable react/react-in-jsx-scope */
// import { getButtonColor } from '../components/UI/helper/getButtonColor';
import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Loader,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store';
import { loginSchema } from '../validation/login-schema';

// import ReCAPTCHA from 'react-google-recaptcha';
// import { useStore } from '../store';

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm(loginSchema);
  const webTheme = useMantineTheme();
  const login = useStore((state) => state.login);
  const setUser = useStore((state) => state.setUser);
  // const reRef = createRef<ReCAPTCHA>();

  const submitHandler = async (values: {
    email: string;
    password: string;
    remember: boolean;
  }): Promise<void> => {
    setLoading(true);
    try {
      // const token = await reRef.current?.executeAsync();
      // reRef.current?.reset();
      // console.log(token);

      const res = await axios.post<{
        firstName: string;
        lastName: string;
        email: string;
        avatar: string;
        role: string;
      }>(
        `${import.meta.env.VITE_APP_BACKEND_API_URL}/auth/login`,
        {
          email: values.email.trim(),
          password: values.password.trim(),
          remember: values.remember,
          token: '',
        },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        setUser(res.data);
        login();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showNotification({
          title: 'خطا',
          message: error.response?.data.message,
          color: 'red',
        });
      }
    }
    setLoading(false);
  };

  return (
    <Container size={420} my={40}>
      {/* <ReCAPTCHA
        sitekey={import.meta.env.VITE_APP_RC_SECRET}
        size='invisible'
        ref={reRef}
      /> */}
      <form onSubmit={form.onSubmit(submitHandler)}>
        <h1 className='text-center font-bold text-4xl'>خوش آمدید!</h1>
        <Text color='dimmed' size='sm' align='center' mt={5}>
          هنوز حساب کاربری ندارید؟{' '}
          <Anchor component={Link} to='/register' size='sm'>
            ثبت نام کنید
          </Anchor>
        </Text>

        <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
          <TextInput
            label='ایمیل'
            placeholder='ایمیل خود را وارد کنید'
            required
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label='رمز عبور'
            placeholder='رمز عبور خود را وارد کنید'
            required
            mt='md'
            {...form.getInputProps('password')}
          />
          <Group position='apart' mt='md'>
            <Checkbox
              label='مرا به خاطر بسپار'
              className='select-none'
              {...form.getInputProps('remember')}
            />
            <Anchor<'a'> href='#' size='sm'>
              رمز عبور خود را فراموش کرده اید؟
            </Anchor>
          </Group>
          <Button
            // className='disabled:hover:cursor-not-allowed'
            fullWidth
            mt='xl'
            type='submit'
            disabled={loading}
            // color={getButtonColor(loading, webTheme.colorScheme)}
          >
            {loading ? (
              <Loader
                size='sm'
                variant='dots'
                color={webTheme.colorScheme === 'light' ? 'gray.6' : 'gray.5'}
              />
            ) : (
              'ورود'
            )}
          </Button>
        </Paper>
      </form>
    </Container>
  );
};

export default Login;
