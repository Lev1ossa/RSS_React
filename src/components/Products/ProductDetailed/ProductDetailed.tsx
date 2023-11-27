import styles from './ProductDetailed.module.scss';
import { ResultItemType } from '../../../types/types';

export function ProductsDetailed(props: {
  queryChangeHandler: (
    search?: string,
    page?: number,
    limit?: number,
    details?: number
  ) => void;
  productData: ResultItemType;
}) {
  const { queryChangeHandler, productData } = props;

  const closeDetailedHandler = () => {
    queryChangeHandler(undefined, undefined, undefined, 0);
  };

  return (
    <div className={styles.item_detailed} data-testid="detail">
      {productData ? (
        <>
          <button
            type="button"
            onClick={closeDetailedHandler}
            data-testid="closeButton"
          >
            Close
          </button>
          <div className={styles.imageContainer}>
            <img
              className={styles.image}
              alt="product image"
              src={productData.images ? productData.images[0] : ''}
            />
          </div>
          <h3 className={styles.name}>{`${productData.title}`}</h3>
          <p className={styles.info}>{`Category: ${productData.category}`}</p>
          <p className={styles.info}>{`Brand: ${productData.brand}`}</p>
          <p className={styles.info}>{`Price: ${productData.price}`}</p>
          <p
            className={styles.info}
          >{`Discount: ${productData.discountPercentage}`}</p>
          <p className={styles.info}>{`Stock: ${productData.stock}`}</p>
          <p className={styles.info}>{`Rating: ${productData.rating}`}</p>
          <p
            className={styles.info}
          >{`Description: ${productData.description}`}</p>
        </>
      ) : (
        true
      )}
      ;
    </div>
  );
}
