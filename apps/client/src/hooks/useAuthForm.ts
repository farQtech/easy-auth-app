import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { isValidPassword } from '../utils/validation';
import { VALIDATION_MESSAGES } from '../utils/constants';

interface SignUpData {
  email: string;
  password: string;
  name: string;
}

interface SignInData {
  email: string;
  password: string;
}

const signupSchema = yup.object({
  name: yup.string().required(VALIDATION_MESSAGES.NAME_REQUIRED),
  email: yup.string().email(VALIDATION_MESSAGES.INVALID_EMAIL).required(VALIDATION_MESSAGES.EMAIL_REQUIRED),
  password: yup
    .string()
    .required(VALIDATION_MESSAGES.PASSWORD_REQUIRED)
    .test('is-strong', VALIDATION_MESSAGES.PASSWORD_TOO_WEAK, (val) => val ? isValidPassword(val) : false),
});

const signinSchema = yup.object({
  email: yup.string().email(VALIDATION_MESSAGES.INVALID_EMAIL).required(VALIDATION_MESSAGES.EMAIL_REQUIRED),
  password: yup
    .string()
    .required(VALIDATION_MESSAGES.PASSWORD_REQUIRED)
    .test('is-strong', VALIDATION_MESSAGES.PASSWORD_TOO_WEAK, (val) => val ? isValidPassword(val) : false),
});

export const useAuthForm = (type: 'signin' | 'signup', onSubmit?: (data: SignUpData | SignInData) => void) => {
  const formMethods = useForm<SignUpData | SignInData>({
    resolver: yupResolver(type === 'signup' ? signupSchema : signinSchema),
  });

  const { register, handleSubmit, reset, formState: { errors } } = formMethods;

  const submitHandler = (data: SignUpData | SignInData) => {
    if(onSubmit)
      onSubmit(data);
  };

  return {
    register,
    handleSubmit: handleSubmit(submitHandler),
    errors,
    reset
  };
};
