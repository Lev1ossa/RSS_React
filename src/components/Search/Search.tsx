import { FormEvent, useEffect, useState } from 'react';
import { ErrorButton } from '../ErrorButton/ErrorButton';
import styles from './Search.module.scss';
import { setLocalStorageSearchValue } from '../../utils/localStorage';
import { DEFAULT_MIN_PAGE } from '../../utils/constants';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../App/appReduxStore/store';
import {
  setCurrentPage,
  setIsLoading,
  setSearchResults,
  setSearchValue,
} from '../App/appReduxStore/reducer';
import { GetProductsProps } from '../../types/types';
import { useGetProductsQuery } from '../App/appReduxStore/productsApi';

export function Search() {
  const searchValue = useSelector((state: RootState) => state.app.searchValue);
  const searchLimit = useSelector((state: RootState) => state.app.searchLimit);
  const currentPage = useSelector((state: RootState) => state.app.currentPage);
  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  const queryParameters = new URLSearchParams(location.search);
  const [inputValue, setInputValue] = useState(searchValue);

  const getProductsProps: GetProductsProps = {
    searchValue,
    currentPage,
    limit: searchLimit,
  };
  const { data, isFetching, refetch } = useGetProductsQuery(getProductsProps);
  useEffect(() => {
    dispatch(setIsLoading(true));
    if (!isFetching) {
      const { skip, total, products } = data;
      dispatch(
        setSearchResults({
          skip: skip,
          total: total,
          products: products,
        })
      );
    }
  }, [data, dispatch, isFetching]);

  const searchInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target) {
      setInputValue(event.target.value);
    }
  };

  const searchSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLocalStorageSearchValue(inputValue);
    dispatch(setSearchValue(inputValue));
    changePageHandler(DEFAULT_MIN_PAGE);
    refetch();
  };

  const changePageHandler = (newPage: number) => {
    dispatch(setCurrentPage(newPage));
    if (currentPage === 1) {
      queryParameters.delete('page');
    } else {
      queryParameters.set('page', currentPage.toString());
    }
    navigate({ search: queryParameters.toString() });
  };

  useEffect(() => {
    if (currentPage === 0) {
      dispatch(setCurrentPage(DEFAULT_MIN_PAGE));
    } else {
      changePageHandler(currentPage);
      refetch();
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
            value={inputValue}
            onChange={searchInputChangeHandler}
            placeholder="Type keyword here"
            autoComplete="off"
            data-testid="searchinput"
          ></input>
          <button
            className={styles.search_button}
            type="submit"
            data-testid="searchbtn"
          >
            Search
          </button>
        </form>
        <ErrorButton />
      </div>
    </section>
  );
}
