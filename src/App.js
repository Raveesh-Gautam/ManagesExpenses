import { useState } from "react";
import AuthPage from "./components/auth/AuthPage";
import Home from "./components/Home";
import { AuthProvider } from "./store/AuthProvider";
import Header from "./components/Header";

const App = () => {
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const handleSuccess = () => {
    setIsLoginSuccess(true);
  };
  return (
    <AuthProvider>
      {!isLoginSuccess ? (
        <AuthPage onLogin={handleSuccess} />
      ) : (
        <div>
          <Header /> <Home />
        </div>
      )}
    </AuthProvider>
  );
};

export default App;
