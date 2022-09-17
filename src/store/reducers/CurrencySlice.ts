import { ICurrency } from './../../models/ICurrency';
import { ICurrencySymbol } from '../../models/ICurrencySymbol';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrencyState {
  current: ICurrency | null
  currenciesList: ICurrency[]
};

const initialState: CurrencyState = {
  current: null,
  currenciesList: [],
};

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    changeCurrentCurrency(state, action: PayloadAction<ICurrency>) {
      state.current = action.payload;
    },
    initCurrencies(state, action: PayloadAction<ICurrency[]>) {
      state.currenciesList = action.payload;
      state.current = state.currenciesList[0];
    },
  }
});

export default currencySlice.reducer;
export const {
  changeCurrentCurrency,
  initCurrencies,
} = currencySlice.actions;
