import { useEffect, useState } from 'react';
import { ResultItemsType, ResultResponse } from '../../types/types';
import {
  getLocalStorageSearchvalue,
  setLocalStorageSearchValue,
} from '../../utils/localStorage';
import { getApiData } from '../../utils/api';
import { Search } from '../../components/Search/Search';
import { Products } from '../../components/Products/Products';
import styles from './Main.module.scss';
import { Loader } from '../../components/Loader/Loader';

export function Main() {
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
        {isLoading ? <Loader /> : <Products searchResults={searchResults} />}
      </main>
    </>
  );
}
