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

export function MainPage() {
  const [searchLimit, setSearchLimit] = useState(10);
  const [searchResults, setSearchResults] = useState<IResultResponse>({
    limit: searchLimit,
    skip: 0,
    total: 0,
    products: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

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

  const searchHandler = (searchValue: string) => {
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
    updateProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

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
          />
        )}
      </main>
    </>
  );
}
