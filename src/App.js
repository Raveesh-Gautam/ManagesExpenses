import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthPage from "./components/auth/AuthPage";
import ForgotPassword from "./components/auth/Forgot";
import Cart from "./components/Cart/Cart";
import ExpenseForm from "./components/ExpenseForm";
import Header from "./components/Header";
import Home from "./components/Home";

const App = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              !isLoggedIn ? (
                <AuthPage />
              ) : (
                <>
                  <Header />
                  <Home />
                  <ExpenseForm />
                </>
              )
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/cart"
            element={
              <>
                <Header />
                <Cart />
              </>
            }
          />
        </Routes>
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"} 
      />
    </>
  );
};

export default App;
