import { UserCards } from '../../components/UserCards/UserCards';
import styles from './MainPage.module.scss';

export function MainPage() {
  return (
    <>
      <main className={styles.main}>
        <UserCards />
      </main>
    </>
  );
}
