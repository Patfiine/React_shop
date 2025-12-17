import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../features/basket/basketSlice";
import notificationReducer from "../features/notification/notificationSlice";

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    notification: notificationReducer,
  },
});

