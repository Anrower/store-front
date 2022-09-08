import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from "../../models/IProduct";

interface ProductState {
  products?: IProduct[];
};

const initialState: ProductState = {
  products: [],
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    updateProductsData(state, action: PayloadAction<IProduct[]>) {
      state.products = action.payload
    },
  }
});

export default productSlice.reducer;
export const {
  updateProductsData,
} = productSlice.actions;
