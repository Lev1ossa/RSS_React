import { IResultResponse } from '../../types/types';
import { ProductsPagination } from './ProductsPagination/ProductsPagination';
import { ProductsContainer } from './ProductsContainer/ProductsContainer';
import styles from './Products.module.scss';

export function Products(props: {
  searchResults: IResultResponse;
  currentPage: number;
  handlePageChange: (page: number) => void;
  handleLimitChange: (limit: number) => void;
}) {
  const { searchResults, currentPage, handlePageChange, handleLimitChange } =
    props;
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
          />
          <ProductsContainer searchResults={searchResults} />
        </>
      ) : (
        <p className={styles.message}>Nothing found, try again!</p>
      )}
    </section>
  );
}
