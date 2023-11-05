import { ResultItemType, ResultItemsType } from '../../types/types';
import { ResultItem } from '../ResultItem/ResultItem';
import styles from './Results.module.scss';

export function Results(props: { searchResults: ResultItemsType }) {
  const { searchResults } = props;
  return (
    <section className={styles.result_block}>
      {searchResults.length ? (
        <div className={styles.result_container}>
          {searchResults.map((item: ResultItemType, idx) => {
            return <ResultItem item={item} key={item.name + idx} />;
          })}
        </div>
      ) : (
        <p className={styles.message}>Nothing found, try again!</p>
      )}
    </section>
  );
}
