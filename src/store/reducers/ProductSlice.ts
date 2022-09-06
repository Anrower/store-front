import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from "../../models/IProduct";

interface ProductState {
  products?: IProduct[];
  isLoading: boolean;
  error: string;
};

const initialState: ProductState = {
  products: [],
  isLoading: false,
  error: '',
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    productsFetching(state) {
      state.isLoading = true;
    },
    productsFetchingSuccess(state, action: PayloadAction<IProduct[] | undefined>) {
      state.isLoading = false;
      state.error = '';
      state.products = action.payload
    },
    productsFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export default productSlice.reducer;
export const {
  productsFetching,
  productsFetchingSuccess,
  productsFetchingError
} = productSlice.actions;
