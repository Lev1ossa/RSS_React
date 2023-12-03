import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

export function Header() {
  return (
    <>
      <NavLink className={styles.link} to="/">
        Main
      </NavLink>
      <NavLink className={styles.link} to="/base-form">
        Base form
      </NavLink>
      <NavLink className={styles.link} to="/hook-form">
        React hook form
      </NavLink>
    </>
  );
}
