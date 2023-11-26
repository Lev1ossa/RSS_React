import { ProductsPagination } from './ProductsPagination/ProductsPagination';
import { ProductsContainer } from './ProductsContainer/ProductsContainer';
import styles from './Products.module.scss';
// import { useSelector } from 'react-redux';
// import { RootState } from '../App/appReduxStore/store';
import { IResultResponse, iProductReponse } from '../../types/types';

export function Products(props: {
  queryChangeHandler: (
    search?: string,
    page?: number,
    limit?: number,
    details?: number
  ) => void;
  searchResults: IResultResponse;
  currentPage: number;
  searchLimit: number;
  detailedProductID: number;
  productResponse: iProductReponse;
}) {
  // const searchResults = useSelector(
  //   (state: RootState) => state.app.searchResults
  // );

  const {
    queryChangeHandler,
    searchResults,
    currentPage,
    searchLimit,
    detailedProductID,
    productResponse,
  } = props;
  const { total: totalItems } = searchResults;

  return (
    <section className={styles.result_block}>
      {totalItems ? (
        <>
          <ProductsPagination
            queryChangeHandler={queryChangeHandler}
            totalItems={totalItems}
            currentPage={currentPage}
            searchLimit={searchLimit}
          />
          <ProductsContainer
            queryChangeHandler={queryChangeHandler}
            searchResults={searchResults}
            detailedProductID={detailedProductID}
            productResponse={productResponse}
          />
        </>
      ) : (
        <p className={styles.message}>Nothing found, try again!</p>
      )}
    </section>
  );
}
