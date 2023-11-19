import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getSearchSkipValue } from '../../../utils/utils';
import { GetProductsProps } from '../../../types/types';
import { setIsLoading, setIsProductLoading } from './reducer';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/products' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (props: GetProductsProps) =>
        `search?q=${props.searchValue}&limit=${
          props.limit
        }&skip=${getSearchSkipValue(props.limit, props.currentPage)}`,
      async onQueryStarted(searchValue, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(setIsLoading(false));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    getProductByID: builder.query({
      query: (productID: number) => `${productID}`,
      async onQueryStarted(productID, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(setIsProductLoading(false));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIDQuery } = productsApi;
