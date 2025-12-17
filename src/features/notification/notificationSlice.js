import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  message: "",
  type: "info", // info | success | error
  undoAction: null, // функция отмены
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification(state, action) {
      return {
        open: true,
        ...action.payload,
      };
    },
    hideNotification() {
      return initialState;
    },
  },
});

export const { showNotification, hideNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
