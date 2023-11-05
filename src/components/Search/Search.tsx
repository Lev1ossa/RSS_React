import { useEffect, useState } from 'react';
import { ErrorButton } from '../ErrorButton/ErrorButton';
import styles from './Search.module.scss';
import {
  getLocalStorageSearchvalue,
  setLocalStorageSearchValue,
} from '../../utils/localStorage';

export function Search(props: {
  searchHandler: (searchValue: string) => void;
}) {
  const { searchHandler } = props;
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setSearchValue(getLocalStorageSearchvalue());
  }, []);

  const searchInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target) {
      setSearchValue(event.target.value);
    }
  };

  const searchButtonHandler = () => {
    setLocalStorageSearchValue(searchValue);
    searchHandler(searchValue);
  };

  return (
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
  );
}
