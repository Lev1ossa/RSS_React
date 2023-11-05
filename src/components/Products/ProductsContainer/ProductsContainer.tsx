import { IResultResponse, ResultItemType } from '../../../types/types';
import { ProductsItem } from '../ProductsItem/ProductsItem';

import styles from './ProductsContainer.module.scss';

export function ProductsContainer(props: { searchResults: IResultResponse }) {
  const { searchResults } = props;
  return (
    <div className={styles.result_container}>
      {searchResults.products.map((item: ResultItemType) => {
        return <ProductsItem item={item} key={item.id} />;
      })}
    </div>
  );
}
