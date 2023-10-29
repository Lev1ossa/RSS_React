import { Component } from 'react';
import styles from './ResultItem.module.scss';

export class ResultItem extends Component {
  render() {
    return (
      <div className={styles.result_item}>
        <h3 className={styles.name}>name</h3>
        <p className={styles.info}>height</p>
        <p className={styles.info}>hair_color</p>
        <p className={styles.info}>skin_color</p>
        <p className={styles.info}>eye_color</p>
        <p className={styles.info}>birth_year</p>
        <p className={styles.info}>gender</p>
      </div>
    );
  }
}
