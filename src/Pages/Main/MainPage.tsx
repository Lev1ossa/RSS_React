import { useEffect } from 'react';

import { Search } from '../../components/Search/Search';
import { Products } from '../../components/Products/Products';
// import { Loader } from '../../components/Loader/Loader';

import styles from './MainPage.module.scss';
import { DEFAULT_MIN_PAGE } from '../../utils/constants';
import { useLocation } from 'react-router-dom';
// import { RootState } from '../../components/App/appReduxStore/store';
// import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentPage,
  setDetailedProductID,
} from '../../components/App/appReduxStore/reducer';
import { useDispatch } from 'react-redux';

export function MainPage() {
  // const isLoading = useSelector((state: RootState) => state.app.isLoading);
  const dispatch = useDispatch();

  const location = useLocation();
  const queryParameters = new URLSearchParams(location.search);

  useEffect(() => {
    dispatch(
      setCurrentPage(Number(queryParameters.get('page')) || DEFAULT_MIN_PAGE)
    );
    dispatch(setDetailedProductID(Number(queryParameters.get('details')) || 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <main className={styles.main}>
        <Search />
        {/* {isLoading ? <Loader /> : <Products />} */}
        <Products />
      </main>
    </>
  );
}
