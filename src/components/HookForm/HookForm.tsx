import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { iRegistrationData } from '../../types/types';
import styles from './HookForm.module.scss';
import { RootState } from '../App/appReduxStore/store';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { schema } from '../../utils/constants';
import { InputPassword } from './InputPassword/InputPassword';
import { useNavigate } from 'react-router-dom';
import { addUserCard } from '../App/appReduxStore/reducer';
import {
  getBase64,
  getPasswordStrengthClass,
  validatePassword,
} from '../../utils/utils';

export function HookForm() {
  const [passwordErrorsList, setPasswordErrorsList] = useState<string[] | null>(
    null
  );

  const passwordHandler = (passwordErrors: string[] | null) => {
    setPasswordErrorsList(passwordErrors);
  };

  const countries = useSelector((state: RootState) => state.app.countries);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler: SubmitHandler<iRegistrationData> = async (
    registrationData: iRegistrationData
  ) => {
    const { name, age, email, password, gender, country } = registrationData;
    const image =
      registrationData.image && registrationData.image
        ? await getBase64(registrationData.image[0])
        : '';

    dispatch(
      addUserCard({
        name,
        age,
        email,
        password,
        gender,
        country,
        image: image as string,
      })
    );
    navigate('/');
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  console.log(errors);

  return (
    <div className={styles.hookForm}>
      <h2 className={styles.title}>Register</h2>
      <form
        className={styles.form}
        onSubmit={handleSubmit(submitHandler)}
        noValidate
      >
        <div className={styles.formContainter}>
          <label className={styles.inputBlock}>
            Name:
            <input {...register('name')} type={'text'} />
            <p className={styles.error}>{errors.name?.message}</p>
          </label>
          <label className={styles.inputBlock}>
            Age:
            <input {...register('age')} type={'text'} />
            <p className={styles.error}>{errors.age?.message}</p>
          </label>
          <label className={styles.inputBlock}>
            Email:
            <input {...register('email')} type={'email'} />
            <p className={styles.error}>{errors.email?.message}</p>
          </label>
          <InputPassword
            register={register}
            validatePassword={validatePassword}
            passwordHandler={passwordHandler}
            errors={passwordErrorsList}
          />
          <div className={getPasswordStrengthClass(passwordErrorsList, styles)}>
            <div className={styles.strengthBar} />
            <div className={styles.strengthBar} />
            <div className={styles.strengthBar} />
            <div className={styles.strengthBar} />
          </div>
          <label className={styles.inputBlock}>
            Confirm password:
            <input {...register('confirmPassword')} type={'password'} />
            <p className={styles.error}>{errors.confirmPassword?.message}</p>
          </label>
          <label className={styles.inputBlock}>
            Gender:
            <select {...register('gender')}>
              <option>Male</option>
              <option>Female</option>
            </select>
            <p className={styles.error}>{errors.gender?.message}</p>
          </label>
          <label className={styles.inputBlock}>
            Country:
            <input
              {...register('country')}
              list="country"
              type={'text'}
            ></input>
            <datalist id="country">
              {countries.map((country, ndx) => (
                <option value={country} key={ndx} />
              ))}
            </datalist>
            <p className={styles.error}>{errors.country?.message}</p>
          </label>
          <label className={styles.inputBlock}>
            Image:
            <input
              className={styles.fileInput}
              {...register('image')}
              type={'file'}
              accept="image/*"
            />
            <p className={styles.error}>{errors.image?.message}</p>
          </label>
          <label className={styles.inputBlock}>
            <input {...register('tc')} type="checkbox" /> I agree with T&C
            <p className={styles.error}>{errors.tc?.message}</p>
          </label>
        </div>
        <button
          className={styles.submit}
          type="submit"
          disabled={!isDirty || !isValid}
        >
          Sign up
        </button>
      </form>
    </div>
  );
}
