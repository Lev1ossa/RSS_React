import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppReduxState, IResultResponse } from '../../../types/types';
import { DEFAULT_LIMIT } from '../../../utils/constants';
import { getLocalStorageSearchvalue } from '../../../utils/localStorage';

const initialState: AppReduxState = {
  searchLimit: DEFAULT_LIMIT,
  searchResults: {
    skip: 0,
    total: 0,
    products: [],
  },
  isLoading: false,
  isProductLoading: false,
  searchValue: getLocalStorageSearchvalue(),
  currentPage: 0,
  detailedProductID: 0,
};

export const appSlice = createSlice({
  name: 'appData',
  initialState,
  reducers: {
    setSearchLimit: (state, action: PayloadAction<number>) => {
      state.searchLimit = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<IResultResponse>) => {
      state.searchResults = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsProductLoading: (state, action: PayloadAction<boolean>) => {
      state.isProductLoading = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setDetailedProductID: (state, action: PayloadAction<number>) => {
      state.detailedProductID = action.payload;
    },
  },
});

export const {
  setSearchLimit,
  setSearchResults,
  setIsLoading,
  setIsProductLoading,
  setSearchValue,
  setCurrentPage,
  setDetailedProductID,
} = appSlice.actions;

export const appReducer = appSlice.reducer;
