import { IResultResponse, ResultItemType } from '../../../types/types';
import { ProductsDetailed } from '../ProductDetailed/ProductDetailed';
import { ProductsItem } from '../ProductsItem/ProductsItem';

import styles from './ProductsContainer.module.scss';

export function ProductsContainer(props: {
  searchResults: IResultResponse;
  detailedProductID: number;
  detailedProductChangeHandler: (id: number) => void;
}) {
  const { searchResults, detailedProductID, detailedProductChangeHandler } =
    props;
  return (
    <div className={styles.results}>
      <div className={styles.result_container}>
        {searchResults.products.map((item: ResultItemType) => {
          return (
            <ProductsItem
              item={item}
              detailedProductChangeHandler={detailedProductChangeHandler}
              key={item.id}
            />
          );
        })}
      </div>
      <ProductsDetailed
        detailedProductID={detailedProductID}
        detailedProductChangeHandler={detailedProductChangeHandler}
      />
    </div>
  );
}
