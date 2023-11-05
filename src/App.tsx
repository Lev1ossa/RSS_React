import React, { useEffect, useState } from 'react';
import styles from './App.module.scss';
import { ErrorButton } from './components/ErrorButton/ErrorButton';
import { ResultContainer } from './components/ResultContainer/ResultContainer';
import { ResultItemsType, ResultResponse } from './types/types';
import { getApiData } from './utils/api';

export function App() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<ResultItemsType>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getSearchvalue = () => {
    const searchKeyWord = localStorage.getItem(
      'lev1ossa-react-components-value'
    );
    return !!searchKeyWord ? searchKeyWord : '';
  };

  useEffect(() => {
    setSearchValue(getSearchvalue());
  }, []);

  const searchButtonHandler = () => {
    setIsLoading(true);
    setLocalStorageValue();
    getApiData(searchValue)
      .then((response) => response.json())
      .then((result: ResultResponse) => setSearchResults(result.results));
  };

  const searchInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target) {
      setSearchValue(event.target.value);
    }
  };

  const setLocalStorageValue = () => {
    localStorage.setItem('lev1ossa-react-components-value', searchValue);
  };

  useEffect(() => {
    console.log('hey');
    setIsLoading(true);
    getApiData(searchValue)
      .then((response) => response.json())
      .then((result: ResultResponse) => {
        setIsLoading(false);
        setSearchResults(result.results);
      });
  }, [searchValue]);

  return (
    <>
      <main className={styles.main}>
        <section className={styles.search_block}>
          <form className={styles.search_form}>
            <label className={styles.search_label} htmlFor="search_input">
              What do you want to search?
            </label>
            <input
              className={styles.search_input}
              id="search_input"
              value={searchValue}
              onChange={searchInputChangeHandler}
              placeholder="Type keyword here"
            ></input>
            <button
              className={styles.search_button}
              type="button"
              onClick={searchButtonHandler}
            >
              Search
            </button>
          </form>
          <ErrorButton />
        </section>
        <section className={styles.result_block}>
          {isLoading ? 'Loading!!!' : <ResultContainer items={searchResults} />}
        </section>
      </main>
    </>
  );
}
