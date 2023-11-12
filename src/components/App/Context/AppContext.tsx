import { createContext, useCallback, useEffect, useState } from 'react';
import { DEFAULT_LIMIT } from '../../../utils/constants';
import { AppContextProps, IResultResponse } from '../../../types/types';
import { getLocalStorageSearchvalue } from '../../../utils/localStorage';
import { getApiData } from '../../../utils/api';

export const AppContext = createContext({} as AppContextProps);

export function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const [searchLimit, setSearchLimit] = useState(DEFAULT_LIMIT);
  const [searchResults, setSearchResults] = useState<IResultResponse>({
    limit: searchLimit,
    skip: 0,
    total: 0,
    products: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState(getLocalStorageSearchvalue());
  const [currentPage, setCurrentPage] = useState(0);
  const [detailedProductID, setDetailedProductID] = useState(0);

  useEffect(() => {
    setSearchValue(getLocalStorageSearchvalue());
  }, [setSearchValue]);

  const updateProducts = useCallback(() => {
    setIsLoading(true);
    getApiData(searchValue, currentPage, searchLimit)
      .then((response) => response.json())
      .then((result: IResultResponse) => {
        setIsLoading(false);
        const { skip, total, products } = result;
        console.log(result.products);
        setSearchResults({
          limit: searchLimit,
          skip,
          total,
          products,
        });
      });
  }, [searchLimit, searchValue, currentPage]);

  return (
    <AppContext.Provider
      value={{
        searchLimit,
        searchResults,
        isLoading,
        searchValue,
        currentPage,
        detailedProductID,
        setSearchLimit,
        setSearchResults,
        setIsLoading,
        setSearchValue,
        setCurrentPage,
        setDetailedProductID,
        updateProducts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
