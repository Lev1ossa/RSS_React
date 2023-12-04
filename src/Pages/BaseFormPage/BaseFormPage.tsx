import { BaseForm } from '../../components/BaseForm/BaseForm';
import { Header } from '../../components/Header/Header';
import styles from './BaseFormPage.module.scss';

export function BaseFormPage() {
  return (
    <>
      <Header pageTitle={'Base form page'} />
      <main className={styles.main}>
        <BaseForm />
      </main>
    </>
  );
}
