import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import AuthPage from "./components/auth/AuthPage";
import Home from "./components/Home";
import Header from "./components/Header";
import ForgotPassword from "./components/auth/Forgot"; 
import { AuthProvider } from "./store/AuthProvider";
import ExpenseForm from "./components/ExpenseForm";

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
