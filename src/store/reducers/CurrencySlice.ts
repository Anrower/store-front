import { ICurrency } from './../../models/ICurrency';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrencyState {
  currentCurrency: ICurrency | null
  currenciesList: ICurrency[]
};

const initialState: CurrencyState = {
  currentCurrency: null,
  currenciesList: [],
};

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    changeCurrentCurrency(state, action: PayloadAction<ICurrency>) {
      state.currentCurrency = action.payload;
    },
    initCurrencies(state, action: PayloadAction<ICurrency[]>) {
      state.currenciesList = action.payload;
      state.currentCurrency = state.currenciesList[0];
    },
  }
});

export default currencySlice.reducer;
export const {
  changeCurrentCurrency,
  initCurrencies,
} = currencySlice.actions;
