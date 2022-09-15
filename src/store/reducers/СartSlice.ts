import { ISelectProduct } from './../../models/ISelectProduct';
import { ICurrencySymbol } from './../../models/ICurrencySymbol';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface ICartState {
  products: ISelectProduct[]
  totalAmount: number,
  totalPrice: number,
  currencySymbol: ICurrencySymbol
}

const initialState: ICartState = {
  products: [],
  totalAmount: 0,
  totalPrice: 0,
  currencySymbol: '$',
}

export const CartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<any>) {
      state.products.push(action.payload);
      state.totalAmount++;
    },
    updateTotalPrice(state, action: PayloadAction<number>) {
      state.totalPrice = state.totalPrice + action.payload;
    },
  }
});

export default CartSlice.reducer;
export const {
  addToCart, updateTotalPrice
} = CartSlice.actions;