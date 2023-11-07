import { useEffect, useState } from 'react';
import { getProductByID } from '../../../utils/api';
import styles from './ProductDetailed.module.scss';
import { OutletContextType, ResultItemType } from '../../../types/types';
import { Loader } from '../../Loader/Loader';
import { useOutletContext } from 'react-router-dom';

export function ProductsDetailed() {
  const { detailedProductID, detailedProductChangeHandler } =
    useOutletContext<OutletContextType>();
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<ResultItemType | undefined>();

  useEffect(() => {
    if (detailedProductID !== 0) {
      setIsLoading(true);
      detailedProductID &&
        getProductByID(detailedProductID)
          .then((response) => response.json())
          .then((result: ResultItemType) => {
            setProduct(result);
            setIsLoading(false);
          });
    }
  }, [detailedProductID]);

  const closeDetailedHandler = () => {
    detailedProductChangeHandler && detailedProductChangeHandler(0);
  };

  return (
    <div className={styles.item_detailed}>
      {product && !isLoading ? (
        <>
          <button type="button" onClick={closeDetailedHandler}>
            Close
          </button>
          <div className={styles.imageContainer}>
            <img
              className={styles.image}
              alt="product image"
              src={product.images[0]}
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
        <Loader />
      )}
      ;
    </div>
  );
}
