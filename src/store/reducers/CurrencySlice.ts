import { ICurrencySymbol } from '../../models/ICurrencySymbol';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrencyState {
  current: ICurrencySymbol;
};

const initialState: CurrencyState = {
  current: "$",
};

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    currencyChange(state, action: PayloadAction<ICurrencySymbol>) {
      state.current = action.payload;
    },
  }
});

export default currencySlice.reducer;
export const {
  currencyChange,
} = currencySlice.actions;
