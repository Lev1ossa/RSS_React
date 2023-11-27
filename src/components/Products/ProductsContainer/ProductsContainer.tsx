import { IResultResponse, ResultItemType } from '../../../types/types';
import { ProductsItem } from '../ProductsItem/ProductsItem';

import styles from './ProductsContainer.module.scss';
import { ProductsDetailed } from '../ProductDetailed/ProductDetailed';

export function ProductsContainer(props: {
  queryChangeHandler: (
    search?: string,
    page?: number,
    limit?: number,
    details?: number
  ) => void;
  searchResults: IResultResponse;
  detailedProductID: number;
  productData: ResultItemType;
}) {
  const { queryChangeHandler, searchResults, detailedProductID, productData } =
    props;

  const closeDetailedHandler = () => {
    if (detailedProductID !== 0) {
      queryChangeHandler(undefined, undefined, undefined, 0);
    }
  };

  return (
    <div className={styles.results}>
      <div className={styles.result_container} onClick={closeDetailedHandler}>
        {searchResults.products.map((item: ResultItemType) => {
          return (
            <ProductsItem
              queryChangeHandler={queryChangeHandler}
              item={item}
              key={item.id}
            />
          );
        })}
      </div>
      {detailedProductID !== 0 && (
        <ProductsDetailed
          queryChangeHandler={queryChangeHandler}
          productData={productData}
        />
      )}
    </div>
  );
}
