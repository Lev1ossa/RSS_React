import { useContext } from 'react';
import { DEFAULT_MIN_PAGE } from '../../../utils/constants';
import { getMaxPage } from '../../../utils/utils';
import { AppContext } from '../../App/Context/AppContext';
import styles from './ProductsPagination.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';

export function ProductsPagination() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParameters = new URLSearchParams(location.search);

  const context = useContext(AppContext);
  const {
    searchLimit,
    searchResults,
    currentPage,
    setSearchLimit,
    setCurrentPage,
  } = context;
  const { limit: itemsPerPage, total: totalItems } = searchResults;

  const changePageHandler = (newPage: number) => {
    setCurrentPage(newPage);
    if (currentPage === 1) {
      queryParameters.delete('page');
    } else {
      queryParameters.set('page', currentPage.toString());
    }
    navigate({ search: queryParameters.toString() });
  };

  const prevPageHandler = () => {
    if (currentPage !== DEFAULT_MIN_PAGE) {
      let newPage = currentPage - 1;
      newPage = newPage < DEFAULT_MIN_PAGE ? DEFAULT_MIN_PAGE : newPage;
      setCurrentPage(newPage);
      changePageHandler(newPage);
    }
  };

  const nextPageHandler = () => {
    const maxPage = getMaxPage(itemsPerPage, totalItems);
    if (currentPage !== maxPage) {
      let newPage = currentPage + 1;
      newPage = newPage > maxPage ? maxPage : newPage;
      setCurrentPage(newPage);
      changePageHandler(newPage);
    }
  };

  const inputLimitChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    event.preventDefault();
    const limit = +event.target.value;
    setSearchLimit(limit);
    setCurrentPage(DEFAULT_MIN_PAGE);
    changePageHandler(DEFAULT_MIN_PAGE);
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
