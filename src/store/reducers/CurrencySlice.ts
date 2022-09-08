import { ICurrency } from './../../models/ICurrency';
import { ICurrencySymbol } from '../../models/ICurrencySymbol';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrencyState {
  current: ICurrencySymbol;
  currencyList: ICurrency[];
};

const initialState: CurrencyState = {
  current: "$",
  currencyList: [{
    label: "USD",
    symbol: "$"
  },
  {
    label: "EUR",
    symbol: "€"
  },
  {
    label: "JPY",
    symbol: "¥"
  }]
};

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    changeCurrentCurrency(state, action: PayloadAction<ICurrencySymbol>) {
      state.current = action.payload;
    },
    updateCurrencyList(state, action: PayloadAction<ICurrency[]>) {
      state.currencyList = action.payload;
    },
  }
});

export default currencySlice.reducer;
export const {
  changeCurrentCurrency, updateCurrencyList,
} = currencySlice.actions;
