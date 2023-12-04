import { Header } from '../../components/Header/Header';
import { HookForm } from '../../components/HookForm/HookForm';
import styles from './HookFormPage.module.scss';

export function HookFormPage() {
  return (
    <>
      <Header pageTitle={'Hook form page'} />
      <main className={styles.main}>
        <HookForm />
      </main>
    </>
  );
}
