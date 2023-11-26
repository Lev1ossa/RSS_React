import styles from './ProductDetailed.module.scss';
import { iProductReponse } from '../../../types/types';

export function ProductsDetailed(props: {
  queryChangeHandler: (
    search?: string,
    page?: number,
    limit?: number,
    details?: number
  ) => void;
  productResponse: iProductReponse;
}) {
  const { queryChangeHandler, productResponse } = props;
  const product = productResponse.data;

  const closeDetailedHandler = () => {
    queryChangeHandler(undefined, undefined, undefined, 0);
  };

  return (
    <div className={styles.item_detailed} data-testid="detail">
      {product ? (
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
              src={product.images ? product.images[0] : ''}
            />
          </div>
          <h3 className={styles.name}>{`${product.title}`}</h3>
          <p className={styles.info}>{`Category: ${product.category}`}</p>
          <p className={styles.info}>{`Brand: ${product.brand}`}</p>
          <p className={styles.info}>{`Price: ${product.price}`}</p>
          <p
            className={styles.info}
          >{`Discount: ${product.discountPercentage}`}</p>
          <p className={styles.info}>{`Stock: ${product.stock}`}</p>
          <p className={styles.info}>{`Rating: ${product.rating}`}</p>
          <p className={styles.info}>{`Description: ${product.description}`}</p>
        </>
      ) : (
        true
      )}
      ;
    </div>
  );
}
