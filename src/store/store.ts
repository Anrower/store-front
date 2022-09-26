import { combineReducers, configureStore } from "@reduxjs/toolkit";
import currencyReducer from "./reducers/CurrencySlice";
import cartReducer from "./reducers/СartSlice";
import popupReducer from "./reducers/PopupSlice";

const rootReducer = combineReducers({
  currencyReducer,
  cartReducer,
  popupReducer,
})

export const store = configureStore({
  reducer: rootReducer
})

//get state store type
export type RootState = ReturnType<typeof store.getState>;
//get store type
export type AppDispatch = typeof store.dispatch
