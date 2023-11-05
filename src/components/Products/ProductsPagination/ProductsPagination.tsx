import { DEFAULT_MIN_PAGE } from '../../../utils/constants';
import { getMaxPage } from '../../../utils/utils';
import styles from './ProductsPagination.module.scss';

export function ProductsPagination(props: {
  currentPage: number;
  handlePageChange: (page: number) => void;
  handleLimitChange: (limit: number) => void;
  itemsPerPage: number;
  totalItems: number;
}) {
  const { currentPage, handlePageChange, itemsPerPage, totalItems } = props;

  const prevPageHandler = () => {
    if (currentPage !== DEFAULT_MIN_PAGE) {
      let newPage = currentPage - 1;
      newPage = newPage < DEFAULT_MIN_PAGE ? DEFAULT_MIN_PAGE : newPage;
      handlePageChange(newPage);
    }
  };

  const nextPageHandler = () => {
    const maxPage = getMaxPage(itemsPerPage, totalItems);
    if (currentPage !== maxPage) {
      let newPage = currentPage + 1;
      newPage = newPage > maxPage ? maxPage : newPage;
      handlePageChange(newPage);
    }
  };

  return (
    <div className={styles.pagination}>
      <div className={styles.paginationContainer}>
        <div className={styles.paginationButton} onClick={prevPageHandler}>
          ←
        </div>
        <div className={styles.paginationButton}>{currentPage}</div>
        <div className={styles.paginationButton} onClick={nextPageHandler}>
          →
        </div>
      </div>
    </div>
  );
}
