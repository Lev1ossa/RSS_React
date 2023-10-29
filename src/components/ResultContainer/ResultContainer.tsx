import { Component } from 'react';
import styles from './ResultContainer.module.scss';
import { ResultItem } from '../ResultItem/ResultItem';
import { ResultItemType, ResultItemsType } from '../../types';

export class ResultContainer extends Component<{ items: ResultItemsType }> {
  render() {
    return this.props.items.length ? (
      <div className={styles.result_container}>
        {this.props.items.map((item: ResultItemType, idx) => {
          return <ResultItem item={item} key={item.name + idx} />;
        })}
      </div>
    ) : (
      <p className={styles.message}>Nothing found, try again!</p>
    );
  }
}
