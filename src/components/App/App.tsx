import React, { useEffect, useState } from 'react';
import styles from './App.module.scss';
import { ResultItemsType, ResultResponse } from '../../types/types';
import { getApiData } from '../../utils/api';
import { Search } from '../Search/Search';
import {
  getLocalStorageSearchvalue,
  setLocalStorageSearchValue,
} from '../../utils/localStorage';
import { Products } from '../Products/Products';

export function App() {
  const [searchResults, setSearchResults] = useState<ResultItemsType>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchHandler = (searchValue: string) => {
    setIsLoading(true);
    setLocalStorageSearchValue(searchValue);
    getApiData(searchValue)
      .then((response) => response.json())
      .then((result: ResultResponse) => {
        setIsLoading(false);
        setSearchResults(result.products);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    const searchValue = getLocalStorageSearchvalue();
    getApiData(searchValue)
      .then((response) => response.json())
      .then((result: ResultResponse) => {
        setIsLoading(false);
        setSearchResults(result.products);
      });
  }, []);

  return (
    <>
      <main className={styles.main}>
        <Search searchHandler={searchHandler} />
        {isLoading ? 'Loading!!!' : <Products searchResults={searchResults} />}
      </main>
    </>
  );
}
