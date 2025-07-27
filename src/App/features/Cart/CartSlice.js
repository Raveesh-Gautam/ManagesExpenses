import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartData: [],
  totalCartAmount: 0,
};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { amount, category, quantity, id } = action.payload;
      const existingItem = state.cartData.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.amount += amount;
      } else {
        state.cartData.push({
          id, 
          amount,
          category,
          quantity,
        });
      }

      state.totalCartAmount = state.cartData.reduce(
        (acc, item) => acc + item.amount,
        0
      );
    },

    removeToCart: (state, action) => {
      const { amount, quantity, id } = action.payload;
      const existingItem = state.cartData.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity -= quantity;
        existingItem.amount -= amount;

        if (existingItem.quantity <= 0 || existingItem.amount <= 0) {
          state.cartData = state.cartData.filter((item) => item.id !== id);
        }

        state.totalCartAmount = state.cartData.reduce(
          (acc, item) => acc + item.amount,
          0
        );
      }
    },
  },
});

export const { addToCart, removeToCart } = CartSlice.actions;
export default CartSlice.reducer;
