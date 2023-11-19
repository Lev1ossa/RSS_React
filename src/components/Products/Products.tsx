import { ProductsPagination } from './ProductsPagination/ProductsPagination';
import { ProductsContainer } from './ProductsContainer/ProductsContainer';
import styles from './Products.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../App/appReduxStore/store';

export function Products() {
  const searchResults = useSelector(
    (state: RootState) => state.app.searchResults
  );

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
