import styles from './ProductsItem.module.scss';
import { ResultItemType } from '../../../types/types';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { setDetailedProductID } from '../../App/appReduxStore/reducer';

export function ProductsItem(props: {
  queryChangeHandler: (
    search?: string,
    page?: number,
    limit?: number,
    details?: number
  ) => void;
  item: ResultItemType;
}) {
  const { queryChangeHandler, item } = props;
  // const dispatch = useDispatch();

  // const location = useLocation();
  // const navigate = useNavigate();
  // const queryParameters = new URLSearchParams(location.search);

  const detailedProductChangeHandler = (id: number) => {
    queryChangeHandler(undefined, undefined, undefined, id);
    // dispatch(setDetailedProductID(id));
    // queryParameters.set('details', id.toString());
    // navigate({ search: queryParameters.toString() });
  };

  return (
    <div
      className={styles.result_item}
      data-testid="product"
      onClick={() => detailedProductChangeHandler(item.id)}
    >
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          alt="product image"
          src={item.images[0]}
        />
      </div>
      <h3 className={styles.name}>{`${item.title}`}</h3>
      <p className={styles.info}>{`Category: ${item.category}`}</p>
      <p className={styles.info}>{`Brand: ${item.brand}`}</p>
      <p className={styles.info}>{`Price: ${item.price}`}</p>
      <p className={styles.info}>{`Discount: ${item.discountPercentage}`}</p>
      <p className={styles.info}>{`Stock: ${item.stock}`}</p>
      <p className={styles.info}>{`Rating: ${item.rating}`}</p>
    </div>
  );
}
