import { Header } from '../../components/Header/Header';
import styles from './BaseFormPage.module.scss';

export function BaseFormPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <p>BaseFormPage</p>
      </main>
    </>
  );
}
