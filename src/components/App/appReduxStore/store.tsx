import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from './reducer';
import { productsApi } from './productsApi';

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
