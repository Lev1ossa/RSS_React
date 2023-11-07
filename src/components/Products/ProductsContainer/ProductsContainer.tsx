import { Outlet } from 'react-router-dom';
import { IResultResponse, ResultItemType } from '../../../types/types';
import { ProductsItem } from '../ProductsItem/ProductsItem';

import styles from './ProductsContainer.module.scss';

export function ProductsContainer(props: {
  searchResults: IResultResponse;
  detailedProductID: number;
  detailedProductChangeHandler: (id: number) => void;
}) {
  const { searchResults, detailedProductID, detailedProductChangeHandler } =
    props;

  const closeDetailedHandler = () => {
    if (detailedProductID !== 0) {
      detailedProductChangeHandler(0);
    }
  };
  return (
    <div className={styles.results}>
      <div className={styles.result_container} onClick={closeDetailedHandler}>
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
      {detailedProductID !== 0 && (
        <Outlet context={{ detailedProductID, detailedProductChangeHandler }} />
      )}
    </div>
  );
}
