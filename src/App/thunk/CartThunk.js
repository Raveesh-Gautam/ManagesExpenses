import { createAsyncThunk } from "@reduxjs/toolkit";

import { addToCart } from "../features/Cart/CartSlice";
import { toast } from "react-toastify";

export const fetchCartData = createAsyncThunk(
  "cart/fetchCartData",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://expensetracker-47692-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) throw new Error("Fetching cart data failed!");

      const data = await response.json();

      if (data && data.cartData) {
        data.cartData.forEach(item => {
          dispatch(addToCart(item)); // store में डालना
        });
      }

      return data;
    } catch (error) {
              toast.error("Cart data not fetched!");

      return rejectWithValue(error.message);
    }
  }
);

// Cart data send करना

export const sendCartData = createAsyncThunk(
  "cart/sendCartData",
  async (_, { getState, rejectWithValue }) => {
    try {
      const cartState = getState().cart;

      const response = await fetch(
        "https://expensetracker-47692-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cartState),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed!");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

