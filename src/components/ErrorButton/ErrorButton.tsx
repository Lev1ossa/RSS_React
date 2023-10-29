import { Component } from 'react';
import styles from './ErrorButton.module.scss';

export class ErrorButton extends Component {
  render() {
    return <button className={styles.error_button}>ERROR!</button>;
  }
}
