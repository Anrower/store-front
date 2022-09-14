import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/ProductSlice";
import currencyReducer from "./reducers/CurrencySlice";
import SelectProductReducer from "./reducers/SelectProductSlice";
import cartReducer from "./reducers/СartSlice";

const rootReducer = combineReducers({
  productReducer,
  currencyReducer,
  SelectProductReducer,
  cartReducer,
})

export const store = configureStore({
  reducer: rootReducer
})

//get state store type
export type RootState = ReturnType<typeof store.getState>;
//get store type
export type AppDispatch = typeof store.dispatch
