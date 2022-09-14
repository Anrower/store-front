import { ICurrencySymbol } from './../../models/ICurrencySymbol';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ICartState {
  products: IProductCart[]
  totalAmount: number,
  totalPrice: number | null,
}

interface IProductCart {
  Id: string | null;
  Name: string | null;
  PriceValue: number | null;
  PriceCurrency: ICurrencySymbol | null;
  [index: number]: string;
}

const initialState: ICartState = {
  products: [],
  totalAmount: 0,
  totalPrice: null,
}

export const CartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<any>) {
      state.products.push(action.payload);
      state.totalAmount++;
    },
  }
});

export default CartSlice.reducer;
export const {
  addToCart,
} = CartSlice.actions;