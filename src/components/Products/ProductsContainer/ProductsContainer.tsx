import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ResultItemType } from '../../../types/types';
import { ProductsItem } from '../ProductsItem/ProductsItem';

import styles from './ProductsContainer.module.scss';
import { useContext } from 'react';
import { AppContext } from '../../App/Context/AppContext';

export function ProductsContainer() {
  const context = useContext(AppContext);
  const { searchResults, detailedProductID, setDetailedProductID } = context;
  const location = useLocation();
  const navigate = useNavigate();
  const queryParameters = new URLSearchParams(location.search);

  const closeDetailedHandler = () => {
    if (detailedProductID !== 0) {
      setDetailedProductID(0);
      queryParameters.delete('details');
      navigate({ search: queryParameters.toString() });
    }
  };

  return (
    <div className={styles.results}>
      <div className={styles.result_container} onClick={closeDetailedHandler}>
        {searchResults.products.map((item: ResultItemType) => {
          return <ProductsItem item={item} key={item.id} />;
        })}
      </div>
      {detailedProductID !== 0 && <Outlet />}
    </div>
  );
}
