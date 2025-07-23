import { useState } from "react";
import AuthPage from "./components/auth/AuthPage";
import Home from "./components/Home";
import { AuthProvider } from "./store/AuthProvider";

const App = () => {
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const handleSuccess = () => {
    setIsLoginSuccess(true);
  };
  return (
    <AuthProvider>
      {!isLoginSuccess ? <AuthPage onLogin={handleSuccess} /> : <Home />}
    </AuthProvider>
  );
};

export default App;
