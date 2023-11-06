import { DEFAULT_MIN_PAGE } from '../../../utils/constants';
import { getMaxPage } from '../../../utils/utils';
import styles from './ProductsPagination.module.scss';

export function ProductsPagination(props: {
  currentPage: number;
  handlePageChange: (page: number) => void;
  handleLimitChange: (limit: number) => void;
  itemsPerPage: number;
  totalItems: number;
  searchLimit: number;
}) {
  const {
    currentPage,
    handlePageChange,
    itemsPerPage,
    totalItems,
    searchLimit,
    handleLimitChange,
  } = props;

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

  const inputLimitChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    event.preventDefault();
    const limit = +event.target.value;
    handleLimitChange(limit);
    handlePageChange(DEFAULT_MIN_PAGE);
  };

  return (
    <div className={styles.pagination}>
      <div className={styles.limitContainer}>
        <label htmlFor="limits">Choose a products per page limit:</label>
        <select
          name="limits"
          id="limits"
          value={searchLimit}
          onChange={inputLimitChangeHandler}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
          <option value="60">60</option>
          <option value="70">70</option>
          <option value="80">80</option>
          <option value="90">90</option>
          <option value="100">100</option>
        </select>
      </div>
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
