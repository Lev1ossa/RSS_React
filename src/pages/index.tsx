import {
  getProductByID,
  getProducts,
  getRunningQueriesThunk,
} from '../components/App/appReduxStore/productsApi';
import { wrapper } from '../components/App/appReduxStore/store';
import { ISSP } from '../types/types';
import { DEFAULT_LIMIT, DEFAULT_MIN_PAGE } from '../utils/constants';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import styles from './MainPage.module.scss';
import { Search } from '../components/Search/Search';
import { Products } from '../components/Products/Products';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const currentPage = Number(context.query.page) || DEFAULT_MIN_PAGE;
    const detailedProductID = Number(context.query.details) || 0;
    const searchLimit = Number(context.query.limit) || DEFAULT_LIMIT;
    const searchValue = context.query.search?.toString() || '';
    const searchResponse = await store.dispatch(
      getProducts.initiate({
        searchValue,
        currentPage,
        limit: searchLimit,
      })
    );
    const productResponse = await store.dispatch(
      getProductByID.initiate(detailedProductID)
    );

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {
        searchResponse,
        productResponse,
        detailedProductID,
        currentPage,
        searchLimit,
        searchValue,
      },
    };
  }
);

export default function MainPage({
  searchResponse,
  productResponse,
  detailedProductID,
  currentPage,
  searchLimit,
  searchValue,
}: ISSP) {
  const { data: searchResults, error } = searchResponse;
  const location = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const queryParameters = new URLSearchParams(location);

  const queryChangeHandler = (
    search = searchValue,
    page = currentPage,
    limit = searchLimit,
    details = detailedProductID
  ) => {
    if (page === 1) {
      queryParameters.delete('page');
    } else {
      queryParameters.set('page', page.toString());
    }

    if (search === '') {
      queryParameters.delete('search');
    } else {
      queryParameters.set('search', search.toString());
    }
    queryParameters.set('limit', limit.toString());
    if (details === 0) {
      queryParameters.delete('details');
    } else {
      queryParameters.set('details', details.toString());
    }
    router.push(pathname + '?' + queryParameters);
  };

  if (error) {
    return (
      <h1 className={styles.error_message}>
        There is some Error. Refresh page!
      </h1>
    );
  }

  return (
    <>
      <main className={styles.main}>
        <Search
          queryChangeHandler={queryChangeHandler}
          searchValue={searchValue}
        />
        {/* {isLoading ? <Loader /> : <Products />} */}
        <Products
          queryChangeHandler={queryChangeHandler}
          searchResults={searchResults}
          currentPage={currentPage}
          searchLimit={searchLimit}
          detailedProductID={detailedProductID}
          productResponse={productResponse}
        />
      </main>
    </>
  );
}
