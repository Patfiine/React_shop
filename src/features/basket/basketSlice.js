// basketSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket(state, action) {
      state.items.push(action.payload);
    },
    removeFromBasket(state, action) {
      // action.payload = id товара
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    restoreItem(state, action) {
      // action.payload = товар
      state.items.push(action.payload);
    }
  },
});

export const { addToBasket, removeFromBasket, restoreItem } = basketSlice.actions;
export default basketSlice.reducer;
