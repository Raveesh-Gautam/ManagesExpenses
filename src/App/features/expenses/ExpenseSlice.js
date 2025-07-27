import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalExpense: 0,
};

const ExpenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    getTotalExpense: (state, action) => {
      state.totalExpense = action.payload.totalVal;
    },
    addExpense: (state, action) => {
      state.totalExpense += Number(action.payload.amount);
    },
    deleteExpense: (state, action) => {
      state.totalExpense -= Number(action.payload.amount);
    },
    updateExpense: (state, action) => {
      const { oldAmount, newAmount } = action.payload;
      state.totalExpense = state.totalExpense - Number(oldAmount) + Number(newAmount);
    },
  },
});

export const { getTotalExpense, addExpense, deleteExpense, updateExpense } =
  ExpenseSlice.actions;
export default ExpenseSlice.reducer;
