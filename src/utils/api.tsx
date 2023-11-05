export const getApiData = (searchValue: string) => {
  return fetch(`https://swapi.dev/api/people/?search=${searchValue}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
