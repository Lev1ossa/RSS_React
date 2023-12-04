import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

export function Header(props: { pageTitle: string }) {
  const { pageTitle } = props;
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{pageTitle}</h1>
      <nav className={styles.navigation}>
        <ul className={styles.navList}>
          <li>
            <NavLink className={styles.link} to="/">
              Main
            </NavLink>
          </li>
          <li>
            <NavLink className={styles.link} to="/base-form">
              Base form
            </NavLink>
          </li>
          <li>
            <NavLink className={styles.link} to="/hook-form">
              React hook form
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
