import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getSearchSkipValue } from '../../../utils/utils';
import { GetProductsProps } from '../../../types/types';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/products' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (props: GetProductsProps) =>
        `search?q=${props.searchValue}&limit=${
          props.limit
        }&skip=${getSearchSkipValue(props.limit, props.currentPage)}`,
    }),
    getProductByID: builder.query({
      query: (productID: number) => `${productID}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIDQuery,
  util: { getRunningQueriesThunk },
} = productsApi;

export const { getProducts, getProductByID } = productsApi.endpoints;
