import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ResultItemType } from '../../../types/types';
import { ProductsItem } from '../ProductsItem/ProductsItem';

import styles from './ProductsContainer.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../App/appReduxStore/store';
import { setDetailedProductID } from '../../App/appReduxStore/reducer';

export function ProductsContainer() {
  const searchResults = useSelector(
    (state: RootState) => state.app.searchResults
  );
  const detailedProductID = useSelector(
    (state: RootState) => state.app.detailedProductID
  );
  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  const queryParameters = new URLSearchParams(location.search);

  const closeDetailedHandler = () => {
    if (detailedProductID !== 0) {
      dispatch(setDetailedProductID(0));
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
