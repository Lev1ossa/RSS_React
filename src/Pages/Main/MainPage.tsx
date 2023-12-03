import { Header } from '../../components/Header/Header';
import { UserCards } from '../../components/UserCards/UserCards';
import styles from './MainPage.module.scss';

export function MainPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <UserCards />
      </main>
    </>
  );
}
