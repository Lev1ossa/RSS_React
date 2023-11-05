import { DEFAULT_MAX_PAGE } from './constants';

export const getMaxPage = (limit: number, total: number) => {
  console.log(limit, total);
  const maxPage = Math.ceil(total / limit);

  return maxPage || DEFAULT_MAX_PAGE;
};

export const getSearchSkipValue = (limit: number, currentPage: number) => {
  return (currentPage - 1) * limit;
};
