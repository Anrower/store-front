import { createSlice } from '@reduxjs/toolkit';

interface PopupState {
  isOpen: boolean
}

const initialState: PopupState = {
  isOpen: false,
};

export const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    togglePopup(state) {
      state.isOpen = !state.isOpen;
    },
  }
});

export default popupSlice.reducer;
export const {
  togglePopup,
} = popupSlice.actions;