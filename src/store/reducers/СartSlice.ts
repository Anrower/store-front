import { ISelectAtt } from './../../models/ISelectAtt';
import { ISelectProduct } from './../../models/ISelectProduct';
import { ICurrencySymbol } from './../../models/ICurrencySymbol';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface ICartState {
  products: ISelectProduct[]
  totalAmount: number,
  totalPrice: number,
  currencySymbol: ICurrencySymbol
}

export interface ICartProductAttUpd {
  productIndex: number,
  selectAtt: ISelectAtt,
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
    updateProductParam(state, action: PayloadAction<ICartProductAttUpd>) {
      state.products[action.payload.productIndex].selectAtt = { ...state.products[action.payload.productIndex].selectAtt, ...action.payload.selectAtt }
    },
    updateProducts(state, action: PayloadAction<ISelectProduct[]>) {
      state.products = action.payload;
    },
    subtractionTotalPrice(state, action: PayloadAction<number>) {
      state.totalPrice = state.totalPrice - action.payload;
    },
    additionTotalPrice(state, action: PayloadAction<number>) {
      state.totalPrice = state.totalPrice + action.payload;
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
  addToCart, updateTotalPrice, updateProductParam, updateProducts, subtractionTotalPrice, increaseTotalAmount, decreaseTotalAmount, decrementProductAmount, additionTotalPrice, incrementProductAmount
} = CartSlice.actions;