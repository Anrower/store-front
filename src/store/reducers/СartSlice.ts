import { ISelectAtt } from './../../models/ISelectAtt';
import { ISelectProduct } from './../../models/ISelectProduct';
import { ICurrencySymbol } from './../../models/ICurrencySymbol';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface ICartState {
  products: ISelectProduct[];
  totalAmount: number
  totalPrice: number
  currencySymbol: ICurrencySymbol
  allTotalPrice: {
    [key: string]: number;
  }
}

export interface ICartProductAttUpd {
  productIndex: number
  selectAtt: ISelectAtt
}

export interface ICartProductPriceUpd {
  productIndex: number
  value: number
  symbol: ICurrencySymbol
}

const initialState: ICartState = {
  products: [],
  totalAmount: 0,
  totalPrice: 0,
  currencySymbol: '$',
  allTotalPrice: {

  }
}

export const CartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ISelectProduct>) {
      state.products.push(action.payload);
      state.totalAmount++;
    },
    updateTotalPrice(state, action: PayloadAction<number>) {
      state.totalPrice = action.payload;
    },
    updateProductParam(state, action: PayloadAction<ISelectProduct[]>) {
      state.products = action.payload
    },
    updateProducts(state, action: PayloadAction<ISelectProduct[]>) {
      state.products = action.payload;
    },
    decrementProductAmount(state, action: PayloadAction<number>) {
      state.products[action.payload].amount--;
    },
    incrementProductAmount(state, action: PayloadAction<number>) {
      state.products[action.payload].amount++;
    },
    increaseTotalAmount(state) {
      state.totalAmount++;
    },
    decreaseTotalAmount(state) {
      state.totalAmount--;
    },
  }
});

export default CartSlice.reducer;
export const {
  addToCart,
  updateTotalPrice,
  updateProductParam,
  updateProducts,
  increaseTotalAmount,
  decreaseTotalAmount,
  decrementProductAmount,
  incrementProductAmount,
} = CartSlice.actions;