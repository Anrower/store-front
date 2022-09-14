import { ICurrencySymbol } from './../../models/ICurrencySymbol';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISelectProduct {
  Id: string;
  Name: string;
  PriceValue: number;
  PriceCurrency: ICurrencySymbol;
  [index: number]: string;
  // Color?: string | null;
  // Capacity?: string | null;
  // Size?: string | null;
}

interface ISelectProductState {
  selectProudct: ISelectProduct;
}

const initialState: ISelectProductState = {
  selectProudct: {
    Id: '',
    Name: '',
    PriceValue: 0,
    PriceCurrency: '$',
    // Color: '',
    // Capacity: '',
    // Size: '',
  }
};

export const selectProductSlice = createSlice({
  name: 'selectProduct',
  initialState,
  reducers: {
    updateSelectProduct(state, action: PayloadAction<ISelectProduct>) {
      state.selectProudct = action.payload
    },
  }
});

export default selectProductSlice.reducer;
export const {
  updateSelectProduct,
} = selectProductSlice.actions;