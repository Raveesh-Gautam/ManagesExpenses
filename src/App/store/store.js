import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from "../features/Auth/AuthSlice";
import CartReducer from '../features/Cart/CartSlice';
import ExpenseReducer from '../features/expenses/ExpenseSlice';
import ThemeReducer from '../features/theme/ThemeSlice';
export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    theme: ThemeReducer,
    expenses:ExpenseReducer,
    cart:CartReducer
  },
});
