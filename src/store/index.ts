import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import galleryReducer from "./slices/gallerySlice";

const rootReducer = combineReducers({
  // gallery: galleryReducer,
})

export const store = configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>;