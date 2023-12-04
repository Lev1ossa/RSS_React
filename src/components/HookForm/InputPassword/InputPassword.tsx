import { UseFormRegister } from 'react-hook-form';
import styles from './InputPassword.module.scss';
import { iRegistrationData } from '../../../types/types';

export function InputPassword(props: {
  register: UseFormRegister<iRegistrationData>;
  validatePassword: (
    password: string,
    passwordHandler: (passwordErrors: string[] | null) => void
  ) => Promise<void>;
  passwordHandler: (passwordErrors: string[] | null) => void;
  errors: string[] | null;
}) {
  const { register, validatePassword, passwordHandler, errors } = props;
  const passwordInput = register('password');
  const { onChange, ref } = passwordInput;
  const errorMessage =
    errors && errors.length
      ? errors.reduce(
          (result, error) => `${result} ${error},`,
          'Password should contain '
        )
      : '';

  return (
    <label className={styles.inputBlock}>
      Password:
      <input
        onChange={async (event) => {
          validatePassword(event.target.value, passwordHandler).then(() => {
            onChange(event);
          });
        }}
        ref={ref}
        name={'password'}
        type={'password'}
      />
      <p className={styles.error}>
        {errors && errors.length
          ? errorMessage.slice(0, errorMessage.length - 1)
          : ''}
      </p>
    </label>
  );
}
