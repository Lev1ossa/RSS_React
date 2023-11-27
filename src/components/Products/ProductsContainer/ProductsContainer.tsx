import { IResultResponse, ResultItemType } from '../../../types/types';
import { ProductsItem } from '../ProductsItem/ProductsItem';

import styles from './ProductsContainer.module.scss';
import { ProductsDetailed } from '../ProductDetailed/ProductDetailed';

export function ProductsContainer(props: {
  queryChangeHandler: (
    search?: string,
    page?: number,
    limit?: number,
    details?: number
  ) => void;
  searchResults: IResultResponse;
  detailedProductID: number;
  productData: ResultItemType;
}) {
  const { queryChangeHandler, searchResults, detailedProductID, productData } =
    props;
  // const searchResults = useSelector(
  //   (state: RootState) => state.app.searchResults
  // );
  // const detailedProductID = useSelector(
  //   (state: RootState) => state.app.detailedProductID
  // );
  // const dispatch = useDispatch();

  // const location = useLocation();
  // const navigate = useNavigate();
  // const queryParameters = new URLSearchParams(location.search);

  const closeDetailedHandler = () => {
    if (detailedProductID !== 0) {
      queryChangeHandler(undefined, undefined, undefined, 0);
      // dispatch(setDetailedProductID(0));
      // queryParameters.delete('details');
      // navigate({ search: queryParameters.toString() });
    }
  };

  return (
    <div className={styles.results}>
      <div className={styles.result_container} onClick={closeDetailedHandler}>
        {searchResults.products.map((item: ResultItemType) => {
          return (
            <ProductsItem
              queryChangeHandler={queryChangeHandler}
              item={item}
              key={item.id}
            />
          );
        })}
      </div>
      {/* {detailedProductID !== 0 && <Outlet />} */}
      {detailedProductID !== 0 && (
        <ProductsDetailed
          queryChangeHandler={queryChangeHandler}
          productData={productData}
        />
      )}
    </div>
  );
}
