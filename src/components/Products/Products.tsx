import { ProductsPagination } from './ProductsPagination/ProductsPagination';
import { ProductsContainer } from './ProductsContainer/ProductsContainer';
import styles from './Products.module.scss';
import { useContext } from 'react';
import { AppContext } from '../App/Context/AppContext';

export function Products() {
  const context = useContext(AppContext);
  const { searchResults } = context;

  return (
    <section className={styles.result_block}>
      {searchResults.total ? (
        <>
          <ProductsPagination />
          <ProductsContainer />
        </>
      ) : (
        <p className={styles.message}>Nothing found, try again!</p>
      )}
    </section>
  );
}
