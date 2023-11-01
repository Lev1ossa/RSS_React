import { Component } from 'react';
import styles from './ResultItem.module.scss';
import { ResultItemType } from '../../types';

export class ResultItem extends Component<{ item: ResultItemType }> {
  render() {
    return (
      <div className={styles.result_item}>
        <h3 className={styles.name}>{`Name: ${this.props.item.name}`}</h3>
        <p className={styles.info}>{`Height: ${this.props.item.height}`}</p>
        <p
          className={styles.info}
        >{`Hair color: ${this.props.item.hair_color}`}</p>
        <p
          className={styles.info}
        >{`Skin color: ${this.props.item.skin_color}`}</p>
        <p
          className={styles.info}
        >{`Eye color: ${this.props.item.eye_color}`}</p>
        <p
          className={styles.info}
        >{`Birth year: ${this.props.item.birth_year}`}</p>
        <p className={styles.info}>{`Gender: ${this.props.item.gender}`}</p>
      </div>
    );
  }
}
