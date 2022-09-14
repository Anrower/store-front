import { ISelectProduct } from '../../models/ISelectProduct';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface ISelectProductState {
  selectProudct: ISelectProduct;
}

const initialState: ISelectProductState = {
  selectProudct: {
    Id: '',
    Name: '',
    PriceValue: 0,
    PriceCurrency: '$',
  }
};

export const selectProductSlice = createSlice({
  name: 'selectProduct',
  initialState,
  reducers: {
    updateSelectProduct(state, action: PayloadAction<ISelectProduct>) {
      state.selectProudct = action.payload
    },
    resetState(state) {
      state.selectProudct = initialState.selectProudct;
    }
  }
});

export default selectProductSlice.reducer;
export const {
  updateSelectProduct, resetState,
} = selectProductSlice.actions;