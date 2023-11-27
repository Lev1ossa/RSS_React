import { FormEvent, useEffect, useState } from 'react';
import { ErrorButton } from '../ErrorButton/ErrorButton';
import styles from './Search.module.scss';
import { DEFAULT_MIN_PAGE } from '../../utils/constants';

export function Search(props: {
  queryChangeHandler: (
    search?: string,
    page?: number,
    limit?: number,
    details?: number
  ) => void;
  searchValue: string;
}) {
  const { queryChangeHandler, searchValue } = props;
  const [inputValue, setInputValue] = useState(searchValue);

  useEffect(() => {
    setInputValue(searchValue);
  }, [searchValue]);

  const searchInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target) {
      setInputValue(event.target.value);
    }
  };

  const searchSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    queryChangeHandler(inputValue, DEFAULT_MIN_PAGE);
  };

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
