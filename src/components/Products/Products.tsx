import { IResultResponse } from '../../types/types';
import { ProductsPagination } from './ProductsPagination/ProductsPagination';
import { ProductsContainer } from './ProductsContainer/ProductsContainer';
import styles from './Products.module.scss';

export function Products(props: {
  searchResults: IResultResponse;
  currentPage: number;
  handlePageChange: (page: number) => void;
  handleLimitChange: (limit: number) => void;
  detailedProductChangeHandler: (id: number) => void;
  searchLimit: number;
  detailedProductID: number;
}) {
  const {
    searchResults,
    currentPage,
    handlePageChange,
    handleLimitChange,
    detailedProductChangeHandler,
    searchLimit,
    detailedProductID,
  } = props;
  const { limit: itemsPerPage, total: totalItems } = searchResults;
  return (
    <section className={styles.result_block}>
      {searchResults.total ? (
        <>
          <ProductsPagination
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            handleLimitChange={handleLimitChange}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            searchLimit={searchLimit}
          />
          <ProductsContainer
            searchResults={searchResults}
            detailedProductID={detailedProductID}
            detailedProductChangeHandler={detailedProductChangeHandler}
          />
        </>
      ) : (
        <p className={styles.message}>Nothing found, try again!</p>
      )}
    </section>
  );
}
