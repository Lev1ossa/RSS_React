import { getSearchSkipValue } from './utils';

export const getApiData = (
  searchValue: string,
  currentPage: number,
  limit: number
) => {
  const searchSkip = getSearchSkipValue(limit, currentPage);
  return fetch(
    `https://dummyjson.com/products/search?q=${searchValue}&limit=${limit}&skip=${searchSkip}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};
