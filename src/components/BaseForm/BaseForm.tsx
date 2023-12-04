import { FormEvent, useRef, useState } from 'react';
import styles from './BaseForm.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../App/appReduxStore/store';
import { getBase64, getPasswordStrengthClass } from '../../utils/utils';
import { addUserCard } from '../App/appReduxStore/reducer';
import { useNavigate } from 'react-router-dom';
import { ValidationError } from 'yup';
import { schema } from '../../utils/constants';
import { IErrors } from '../../types/types';

export function BaseForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const registrationData = {
      name: name.current?.value,
      age: Number(age.current?.value),
      email: email.current?.value,
      password: password.current?.value,
      confirmPassword: confirmPassword.current?.value,
      gender: gender.current?.value,
      country: country.current?.value,
      image: image.current?.files,
      tc: tc.current?.checked,
    };

    try {
      await schema.validate(registrationData, { abortEarly: false });
      const image64 =
        image.current && image.current.files
          ? await getBase64(image.current.files[0])
          : '';
      dispatch(
        addUserCard({
          name: name.current?.value as string,
          age: Number(age.current?.value),
          email: email.current?.value as string,
          password: password.current?.value as string,
          gender: gender.current?.value as string,
          country: country.current?.value as string,
          image: image64 as string,
        })
      );
      navigate('/');
    } catch (e) {
      const error = e as ValidationError;
      const newErrors: IErrors = {
        name: [],
        age: [],
        email: [],
        password: null,
        confirmPassword: [],
        gender: [],
        country: [],
        image: [],
        tc: [],
      };
      error.inner.forEach((item) => {
        const key = item.path?.split(' ')[0] as keyof typeof newErrors;
        if (Array.isArray(newErrors[key])) {
          newErrors[key]?.push(item.message);
        } else {
          newErrors[key] = [item.message];
        }
        setErrors(newErrors);
      });
    }
  };
  const countries = useSelector((state: RootState) => state.app.countries);

  const name = useRef<HTMLInputElement>(null);
  const age = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);
  const gender = useRef<HTMLSelectElement>(null);
  const country = useRef<HTMLInputElement>(null);
  const image = useRef<HTMLInputElement>(null);
  const tc = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<IErrors>({
    name: [],
    age: [],
    email: [],
    password: null,
    confirmPassword: [],
    gender: [],
    country: [],
    image: [],
    tc: [],
  });

  const nameErrorMessage = errors.name.length
    ? errors.name.reduce((result, error) => `${result} ${error},`, '')
    : '';

  const ageErrorMessage = errors.age.length
    ? errors.age.reduce((result, error) => `${result} ${error},`, '')
    : '';

  const imageErrorMessage = errors.image.length
    ? errors.image.reduce((result, error) => `${result} ${error},`, '')
    : '';
  const passwordErrorMessage = errors.password
    ? errors.password.reduce(
        (result, error) => `${result} ${error},`,
        'Password should contain '
      )
    : '';

  return (
    <div className={styles.baseForm}>
      <h2 className={styles.title}>Register</h2>
      <form className={styles.form} onSubmit={submitHandler} noValidate>
        <div className={styles.formContainter}>
          <label className={styles.inputBlock}>
            Name:
            <input ref={name} type={'text'} />
            <p className={styles.error}>
              {nameErrorMessage
                ? nameErrorMessage.slice(0, nameErrorMessage.length - 1)
                : ''}
            </p>
          </label>
          <label className={styles.inputBlock}>
            Age:
            <input ref={age} type={'text'} />
            <p className={styles.error}>
              {ageErrorMessage
                ? ageErrorMessage.slice(0, ageErrorMessage.length - 1)
                : ''}
            </p>
          </label>
          <label className={styles.inputBlock}>
            Email:
            <input ref={email} type={'email'} />
            <p className={styles.error}>{errors.email[0]}</p>
          </label>
          <label className={styles.inputBlock}>
            Password:
            <input ref={password} type={'password'} />
            <p className={styles.error}>
              {passwordErrorMessage
                ? passwordErrorMessage.slice(0, passwordErrorMessage.length - 1)
                : ''}
            </p>
          </label>
          <div className={getPasswordStrengthClass(errors.password, styles)}>
            <div className={styles.strengthBar} />
            <div className={styles.strengthBar} />
            <div className={styles.strengthBar} />
            <div className={styles.strengthBar} />
          </div>
          <label className={styles.inputBlock}>
            Confirm password:
            <input ref={confirmPassword} type={'password'} />
            <p className={styles.error}>{errors.confirmPassword[0]}</p>
          </label>
          <label className={styles.inputBlock}>
            Gender:
            <select ref={gender}>
              <option>Male</option>
              <option>Female</option>
            </select>
            <p className={styles.error}>{errors.gender[0]}</p>
          </label>
          <label className={styles.inputBlock}>
            Country:
            <input ref={country} list="country" type={'text'} />
            <datalist id="country">
              {countries.map((country, idx) => (
                <option value={country} key={idx} />
              ))}
            </datalist>
            <p className={styles.error}>{errors.country[0]}</p>
          </label>
          <label className={styles.inputBlock}>
            Image:
            <input
              ref={image}
              className={styles.fileInput}
              type={'file'}
              accept="image/*"
            />
            <p className={styles.error}>
              {imageErrorMessage
                ? imageErrorMessage.slice(0, imageErrorMessage.length - 1)
                : ''}
            </p>
          </label>
          <label className={styles.inputBlock}>
            <input ref={tc} type="checkbox" /> I agree with T&C
            <p className={styles.error}>{errors.tc[0]}</p>
          </label>
        </div>
        <button className={styles.submit} type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
}
