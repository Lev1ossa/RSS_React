import { FormEvent, useContext, useEffect } from 'react';
import { ErrorButton } from '../ErrorButton/ErrorButton';
import styles from './Search.module.scss';
import { setLocalStorageSearchValue } from '../../utils/localStorage';
import { AppContext } from '../App/Context/AppContext';
import { DEFAULT_MIN_PAGE } from '../../utils/constants';
import { useLocation, useNavigate } from 'react-router-dom';

export function Search() {
  const context = useContext(AppContext);
  const {
    searchValue,
    searchLimit,
    currentPage,
    setSearchValue,
    updateProducts,
    setCurrentPage,
  } = context;

  const location = useLocation();
  const navigate = useNavigate();
  const queryParameters = new URLSearchParams(location.search);

  const searchInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target) {
      setSearchValue(event.target.value);
    }
  };

  const searchSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLocalStorageSearchValue(searchValue);
    changePageHandler(DEFAULT_MIN_PAGE);
    setLocalStorageSearchValue(searchValue);
    updateProducts();
  };

  const changePageHandler = (newPage: number) => {
    setCurrentPage(newPage);
    if (currentPage === 1) {
      queryParameters.delete('page');
    } else {
      queryParameters.set('page', currentPage.toString());
    }
    navigate({ search: queryParameters.toString() });
  };

  useEffect(() => {
    if (currentPage === 0) {
      setCurrentPage(DEFAULT_MIN_PAGE);
    } else {
      changePageHandler(currentPage);
      updateProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchLimit]);

  return (
    <section className={styles.search_block}>
      <div className={styles.search_container}>
        <form className={styles.search_form} onSubmit={searchSubmitHandler}>
          <label className={styles.search_label} htmlFor="search_input">
            What do you want to search?
          </label>
          <input
            className={styles.search_input}
            id="search_input"
            value={searchValue}
            onChange={searchInputChangeHandler}
            placeholder="Type keyword here"
            autoComplete="off"
          ></input>
          <button className={styles.search_button} type="submit">
            Search
          </button>
        </form>
        <ErrorButton />
      </div>
    </section>
  );
}
