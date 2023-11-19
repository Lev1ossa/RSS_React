import { useContext, useEffect } from 'react';

import { Search } from '../../components/Search/Search';
import { Products } from '../../components/Products/Products';
import { Loader } from '../../components/Loader/Loader';

import styles from './MainPage.module.scss';
import { DEFAULT_MIN_PAGE } from '../../utils/constants';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../../components/App/Context/AppContext';

export function MainPage() {
  const context = useContext(AppContext);
  const { isLoading, setCurrentPage, setDetailedProductID } = context;

  const location = useLocation();
  const queryParameters = new URLSearchParams(location.search);

  useEffect(() => {
    setCurrentPage(Number(queryParameters.get('page')) || DEFAULT_MIN_PAGE);
    setDetailedProductID(Number(queryParameters.get('details')) || 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <main className={styles.main}>
        <Search />
        {isLoading ? <Loader /> : <Products />}
      </main>
    </>
  );
}
