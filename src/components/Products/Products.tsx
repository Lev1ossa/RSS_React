import { ResultItemType, ResultItemsType } from '../../types/types';
import { ProductsItem } from '../ProductsItem/ProductsItem';
import styles from './Products.module.scss';

export function Products(props: { searchResults: ResultItemsType }) {
  const { searchResults } = props;
  return (
    <section className={styles.result_block}>
      {searchResults.length ? (
        <div className={styles.result_container}>
          {searchResults.map((item: ResultItemType) => {
            return <ProductsItem item={item} key={item.id} />;
          })}
        </div>
      ) : (
        <p className={styles.message}>Nothing found, try again!</p>
      )}
    </section>
  );
}
