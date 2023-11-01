import React, { Component } from 'react';
import styles from './App.module.scss';
import { ErrorButton } from './components/ErrorButton/ErrorButton';
import { ResultContainer } from './components/ResultContainer/ResultContainer';
import { ResultResponse } from './types';

export class App extends Component {
  state = {
    searchValue: this.setSearchValue(),
    results: [],
    isLoading: false,
  };

  setSearchValue() {
    const searchKeyWord = localStorage.getItem(
      'lev1ossa-react-components-value'
    );
    return !!searchKeyWord ? searchKeyWord : '';
  }

  searchButtonHandler = () => {
    this.setState({
      isLoading: true,
    });
    this.setLocalStorageValue();
    this.getApiData()
      .then((response) => response.json())
      .then((result: ResultResponse) =>
        this.setState({
          results: result.results,
        })
      );
  };

  searchInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target) {
      this.setState({
        searchValue: event.target.value,
      });
    }
  };

  setLocalStorageValue = () => {
    localStorage.setItem(
      'lev1ossa-react-components-value',
      this.state.searchValue
    );
  };

  componentDidMount() {
    this.setState({
      isLoading: true,
    });
    this.getApiData()
      .then((response) => response.json())
      .then((result: ResultResponse) =>
        this.setState({
          isLoading: false,
          results: result.results,
        })
      );
  }

  getApiData() {
    return fetch(
      `https://swapi.dev/api/people/?search=${this.state.searchValue}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  render() {
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
                value={this.state.searchValue}
                onChange={this.searchInputChangeHandler}
                placeholder="Type keyword here"
              ></input>
              <button
                className={styles.search_button}
                type="submit"
                onClick={this.searchButtonHandler}
              >
                Search
              </button>
            </form>
            <ErrorButton />
          </section>
          <section className={styles.result_block}>
            {this.state.isLoading ? (
              'Loading!!!'
            ) : (
              <ResultContainer items={this.state.results} />
            )}
          </section>
        </main>
      </>
    );
  }
}
