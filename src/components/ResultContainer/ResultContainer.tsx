import styles from './ResultContainer.module.scss';
import { ResultItem } from '../ResultItem/ResultItem';
import { ResultItemType, ResultItemsType } from '../../types/types';

export function ResultContainer(props: { items: ResultItemsType }) {
  const { items } = props;
  return items.length ? (
    <div className={styles.result_container}>
      {items.map((item: ResultItemType, idx) => {
        return <ResultItem item={item} key={item.name + idx} />;
      })}
    </div>
  ) : (
    <p className={styles.message}>Nothing found, try again!</p>
  );
}
