import { ISelectAtt } from './../../models/ISelectAtt';
import { ISelectProduct } from '../../models/ISelectProduct';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface ISelectProductState {
  selectProudct: ISelectProduct;
}

const initialState: ISelectProductState = {
  selectProudct: {
    id: '',
    name: '',
    instock: true,
    brand: '',
    priceValue: 0,
    priceCurrency: '$',
    attributes: [],
    gallery: [],
    selectAtt: {},
    amount: 1,
  }
};

export const selectProductSlice = createSlice({
  name: 'selectProduct',
  initialState,
  reducers: {
    updateSelectProduct(state, action: PayloadAction<ISelectProduct>) {
      state.selectProudct = action.payload;
    },
    updateSelectAtt(state, action: PayloadAction<ISelectAtt>) {
      state.selectProudct.selectAtt =
        { ...state.selectProudct.selectAtt, ...action.payload };
    },
    resetState(state) {
      state.selectProudct = initialState.selectProudct;
    }
  }
});

export default selectProductSlice.reducer;
export const {
  updateSelectProduct, resetState, updateSelectAtt
} = selectProductSlice.actions;