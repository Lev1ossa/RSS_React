export const getApiData = (searchValue: string) => {
  return fetch(`https://dummyjson.com/products/search?q=${searchValue}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
