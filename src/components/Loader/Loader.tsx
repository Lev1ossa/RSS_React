import styles from './Loader.module.scss';

export function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader} data-testid="loader"></div>
    </div>
  );
}
