import { createSlice } from "@reduxjs/toolkit";
import { sendCartData,fetchCartData } from "../../thunk/CartThunk";
const initialState = {
  cartData: [],
  totalCartAmount: 0,
  status: "idle", 
  error: null,
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

  extraReducers: (builder) => {
    builder
      // ✅ Send Cart Data
      .addCase(sendCartData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sendCartData.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(sendCartData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ✅ Fetch Cart Data
      .addCase(fetchCartData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartData.fulfilled, (state, action) => {
        state.status = "success";
        state.cartData = action.payload.cartData || [];
        state.totalCartAmount = action.payload.totalCartAmount || 0;
      })
      .addCase(fetchCartData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { addToCart, removeToCart } = CartSlice.actions;
export default CartSlice.reducer;
