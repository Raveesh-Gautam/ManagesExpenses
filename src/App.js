import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AuthPage from "./components/auth/AuthPage";
import ForgotPassword from "./components/auth/Forgot";
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
                <>
                  <AuthPage />
                </>
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
        </Routes>
      </Router>
    </>
  );
};

export default App;
