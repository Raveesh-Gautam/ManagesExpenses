import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AuthPage from "./components/auth/AuthPage";
import ForgotPassword from "./components/auth/Forgot";
import ExpenseForm from "./components/ExpenseForm";
import Header from "./components/Header";
import Home from "./components/Home";
import { AuthProvider } from "./store/AuthProvider";

const App = () => {
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);

  const handleSuccess = () => {
    setIsLoginSuccess(true);
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              !isLoginSuccess ? (
                <AuthPage onLogin={handleSuccess} />
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
    </AuthProvider>
  );
};

export default App;
