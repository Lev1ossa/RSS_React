import styles from './ProductsItem.module.scss';
import { ResultItemType } from '../../../types/types';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../App/Context/AppContext';

export function ProductsItem(props: { item: ResultItemType }) {
  const { item } = props;

  const context = useContext(AppContext);
  const { setDetailedProductID } = context;

  const location = useLocation();
  const navigate = useNavigate();
  const queryParameters = new URLSearchParams(location.search);

  const detailedProductChangeHandler = (id: number) => {
    console.log('hello');
    setDetailedProductID(id);
    queryParameters.set('details', id.toString());
    navigate({ search: queryParameters.toString() });
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
