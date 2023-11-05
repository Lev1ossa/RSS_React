import styles from './ResultItem.module.scss';
import { ResultItemType } from '../../types/types';

export function ResultItem(props: { item: ResultItemType }) {
  const { item } = props;
  return (
    <div className={styles.result_item}>
      <h3 className={styles.name}>{`Name: ${item.name}`}</h3>
      <p className={styles.info}>{`Height: ${item.height}`}</p>
      <p className={styles.info}>{`Hair color: ${item.hair_color}`}</p>
      <p className={styles.info}>{`Skin color: ${item.skin_color}`}</p>
      <p className={styles.info}>{`Eye color: ${item.eye_color}`}</p>
      <p className={styles.info}>{`Birth year: ${item.birth_year}`}</p>
      <p className={styles.info}>{`Gender: ${item.gender}`}</p>
    </div>
  );
}
