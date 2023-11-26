// import { useEffect, useState } from 'react';
import styles from './ProductDetailed.module.scss';
import {
  // ISearchResponse,
  // ResultItemType,
  iProductReponse,
} from '../../../types/types';
import { Loader } from '../../Loader/Loader';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../../App/appReduxStore/store';
// import {
//   setDetailedProductID,
//   setIsProductLoading,
// } from '../../App/appReduxStore/reducer';
// import { useGetProductByIDQuery } from '../../App/appReduxStore/productsApi';

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
  // const [product, setProduct] = useState<ResultItemType | undefined>();
  // const detailedProductID = useSelector(
  //   (state: RootState) => state.app.detailedProductID
  // );
  // const isProductLoading = useSelector(
  //   (state: RootState) => state.app.isProductLoading
  // );
  // const dispatch = useDispatch();
  // const location = useLocation();
  // const navigate = useNavigate();
  // const queryParameters = new URLSearchParams(location.search);

  // const { data, isFetching, refetch } =
  //   useGetProductByIDQuery(detailedProductID);

  // useEffect(() => {
  //   // dispatch(setIsProductLoading(true));
  //   if (!isFetching) {
  //     setProduct(data);
  //   }
  // }, [data, dispatch, isFetching]);

  // useEffect(() => {
  //   if (detailedProductID) {
  //     refetch();
  //   }
  // }, [detailedProductID, refetch]);

  const closeDetailedHandler = () => {
    queryChangeHandler(undefined, undefined, undefined, 0);
    // dispatch(setDetailedProductID(0));
    // queryParameters.delete('details');
    // navigate({ search: queryParameters.toString() });
  };

  return (
    <div className={styles.item_detailed} data-testid="detail">
      {/* {product && !isProductLoading ? (
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
      )} */}
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
        <Loader />
      )}
      ;
    </div>
  );
}
