import { useEffect, useState } from 'react';
import { getProductByID } from '../../../utils/api';
import styles from './ProductDetailed.module.scss';
import { ResultItemType } from '../../../types/types';
import { Loader } from '../../Loader/Loader';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../App/appReduxStore/store';
import {
  setDetailedProductID,
  setIsProductLoading,
} from '../../App/appReduxStore/reducer';

export function ProductsDetailed() {
  const [product, setProduct] = useState<ResultItemType | undefined>();
  const detailedProductID = useSelector(
    (state: RootState) => state.app.detailedProductID
  );
  const isProductLoading = useSelector(
    (state: RootState) => state.app.isProductLoading
  );
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParameters = new URLSearchParams(location.search);

  useEffect(() => {
    if (detailedProductID !== 0) {
      dispatch(setIsProductLoading(true));
      detailedProductID &&
        getProductByID(detailedProductID)
          .then((response) => response.json())
          .then((result: ResultItemType) => {
            setProduct(result);
            dispatch(setIsProductLoading(false));
          });
    }
  }, [detailedProductID, dispatch]);

  const closeDetailedHandler = () => {
    dispatch(setDetailedProductID(0));
    queryParameters.delete('details');
    navigate({ search: queryParameters.toString() });
  };

  return (
    <div className={styles.item_detailed} data-testid="detail">
      {product && !isProductLoading ? (
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
        <Loader />
      )}
      ;
    </div>
  );
}
