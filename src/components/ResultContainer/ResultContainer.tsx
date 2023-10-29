import { Component } from 'react';
import styles from './ResultContainer.module.scss';
import { ResultItem } from '../ResultItem/ResultItem';

export class ResultContainer extends Component {
  render() {
    return (
      <div className={styles.result_container}>
        <ResultItem></ResultItem>
      </div>
    );
  }
}
