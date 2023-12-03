import * as yup from 'yup';
import { store } from '../components/App/appReduxStore/store';

export const MAX_FILE_SIZE = 102400;

const savedCountries = store.getState().app.countries;

const baseSchema = yup.object().shape({
  name: yup
    .string()
    .required('Enter your name')
    .matches(/^[A-ZА-Я]([]*)/, { message: 'First letter is not uppercased' }),
  age: yup
    .number()
    .required('Enter your age')
    .positive('Not positive')
    .typeError('Not a number'),
  email: yup.string().email().required('Invalid email'),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Passwords must be same'),
  gender: yup.string().required(),
  tc: yup.string().matches(/true/, { message: 'Agree with T&C to continue' }),
  image: yup
    .mixed<FileList>()
    .nullable()
    .required('Image is reqired')
    .test(
      'size',
      'Image size should be less then 100KB',
      (value) =>
        value && Array.from(value).every((item) => item.size <= MAX_FILE_SIZE)
    )
    .test(
      'type',
      'Image type should be "png" or "jpeg"',
      (value) =>
        value &&
        Array.from(value).every(
          (file) => file.type === 'image/png' || file.type === 'image/jpeg'
        )
    ),
  country: yup
    .string()
    .required()
    .test(
      'country',
      'Choose country from list',
      (value) => !!value && savedCountries.includes(value)
    ),
});

export const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .matches(RegExp('(.*[a-z].*)'), 'Lowercase')
    .matches(RegExp('(.*[A-Z].*)'), 'Uppercase')
    .matches(RegExp('(.*\\d.*)'), 'Number')
    .matches(RegExp('[!@#$%^&*(),.?":{}|<>]'), 'Special')
    .required('and be not empty'),
});

export const schema = baseSchema.concat(passwordSchema);
