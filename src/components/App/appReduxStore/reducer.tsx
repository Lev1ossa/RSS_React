import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { appReduxInitialState } from '../../../utils/utils';
import { UserCard } from '../../../types/types';

export const appSlice = createSlice({
  name: 'appData',
  initialState: appReduxInitialState,
  reducers: {
    addUserCard: (state, action: PayloadAction<UserCard>) => {
      state.userCards.push(action.payload);
    },
  },
});

export const { addUserCard } = appSlice.actions;

export const appReducer = appSlice.reducer;
