import { useState } from 'react';
import styles from './ErrorButton.module.scss';

export function ErrorButton() {
  const [hasError, setHasError] = useState(false);

  const errorButtonHandler = () => {
    setHasError(true);
  };

  if (hasError) {
    throw new Error('Forced app crash!');
  }
  return (
    <button className={styles.error_button} onClick={errorButtonHandler}>
      ERROR!
    </button>
  );
}
