import { ICurrency } from './../../models/ICurrency';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrencyState {
  current: ICurrency;
};

const initialState: CurrencyState = {
  current: "$",
};

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    currencyChange(state, action: PayloadAction<ICurrency>) {
      state.current = action.payload;
    },
  }
});

export default currencySlice.reducer;
export const {
  currencyChange,
} = currencySlice.actions;
