import { useEffect, useState } from 'react';

import { IResultResponse } from '../../types/types';
import {
  getLocalStorageSearchvalue,
  setLocalStorageSearchValue,
} from '../../utils/localStorage';
import { getApiData } from '../../utils/api';
import { Search } from '../../components/Search/Search';
import { Products } from '../../components/Products/Products';
import { Loader } from '../../components/Loader/Loader';

import styles from './MainPage.module.scss';
import { DEFAULT_LIMIT, DEFAULT_MIN_PAGE } from '../../utils/constants';
import { useLocation, useNavigate } from 'react-router-dom';

export function MainPage() {
  const [searchLimit, setSearchLimit] = useState(DEFAULT_LIMIT);
  const [searchResults, setSearchResults] = useState<IResultResponse>({
    limit: searchLimit,
    skip: 0,
    total: 0,
    products: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const queryParameters = new URLSearchParams(location.search);
  const [currentPage, setCurrentPage] = useState(
    Number(queryParameters.get('page')) || DEFAULT_MIN_PAGE
  );

  const updateProducts = () => {
    setIsLoading(true);
    const searchValue = getLocalStorageSearchvalue();
    const { limit } = searchResults;
    getApiData(searchValue, currentPage, limit)
      .then((response) => response.json())
      .then((result: IResultResponse) => {
        setIsLoading(false);
        const { skip, total, products } = result;
        setSearchResults({
          limit: searchLimit,
          skip,
          total,
          products,
        });
      });
  };

  const updateQuery = (queryParam: string, queryValue: number) => {
    if (queryParam === 'page' && queryValue === DEFAULT_MIN_PAGE) {
      queryParameters.delete('page');
    } else {
      queryParameters.set(`${queryParam}`, queryValue.toString());
    }
    navigate({ search: queryParameters.toString() });
  };

  const searchHandler = (searchValue: string) => {
    setCurrentPage(DEFAULT_MIN_PAGE);
    setLocalStorageSearchValue(searchValue);
    updateProducts();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleLimitChange = (limit: number) => {
    setSearchLimit(limit);
  };

  useEffect(() => {
    updateQuery('page', currentPage);
    updateProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchLimit]);

  return (
    <>
      <main className={styles.main}>
        <Search searchHandler={searchHandler} />
        {isLoading ? (
          <Loader />
        ) : (
          <Products
            searchResults={searchResults}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            handleLimitChange={handleLimitChange}
            searchLimit={searchLimit}
          />
        )}
      </main>
    </>
  );
}
