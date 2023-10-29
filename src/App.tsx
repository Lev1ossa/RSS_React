import { Component } from 'react';
import styles from './App.module.scss';
import { ErrorButton } from './components/ErrorButton/ErrorButton';
import { ResultContainer } from './components/ResultContainer/ResultContainer';

export class App extends Component {
  render() {
    return (
      <>
        <main className={styles.main}>
          <section className={styles.search_block}>
            <ErrorButton></ErrorButton>
            <form className={styles.search_form}>
              <label className={styles.search_label} htmlFor="search_input">
                What do you want to search?
              </label>
              <input
                className={styles.search_input}
                id="search_input"
                placeholder="Type keyword here"
              ></input>
              <button className={styles.search_button} type="submit">
                Search
              </button>
            </form>
          </section>
          <section className={styles.result_block}>
            <ResultContainer></ResultContainer>
          </section>
        </main>
      </>
    );
  }
}
