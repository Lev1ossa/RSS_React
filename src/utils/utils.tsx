import { ValidationError } from 'yup';
import { passwordSchema } from './constants';

export const getBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => resolve(fileReader.result?.toString() || '');
    fileReader.onerror = (error) => reject(error);
  });
};

export const getPasswordStrengthClass = (
  passwordErrorsList: string[] | null,
  styles: CSSModuleClasses
) => {
  if (!passwordErrorsList) {
    return `${styles.noValidation}`;
  }
  if (passwordErrorsList.length === 4 || passwordErrorsList.length === 5) {
    return `${styles.passwordStrength}`;
  } else if (passwordErrorsList.length === 3) {
    return `${styles.passwordStrength} ${styles.level1}`;
  } else if (passwordErrorsList.length === 2) {
    return `${styles.passwordStrength} ${styles.level2}`;
  } else if (passwordErrorsList.length === 1) {
    return `${styles.passwordStrength} ${styles.level3}`;
  } else if (passwordErrorsList.length === 0) {
    return `${styles.passwordStrength} ${styles.level4}`;
  }
};

export const validatePassword = async (
  password: string,
  passwordHandler: (passwordErrors: string[] | null) => void
) => {
  try {
    const result = await passwordSchema.validate(
      { isUsageNotRequired: true, password },
      { abortEarly: false }
    );
    if (!!result) {
      passwordHandler([]);
    }
  } catch (err) {
    const error = err as ValidationError;
    passwordHandler(error.errors);
  }
};
