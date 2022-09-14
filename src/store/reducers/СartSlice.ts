import { ICurrencySymbol } from './../../models/ICurrencySymbol';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface ICartState {
  products: IProductCart[]
  totalAmount: number,
  totalPrice: number,
}

export interface IProductCart {
  Id: string;
  Name: string;
  PriceValue: number;
  PriceCurrency: ICurrencySymbol;
  [index: number]: string;
}

const initialState: ICartState = {
  products: [],
  totalAmount: 0,
  totalPrice: 0,
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