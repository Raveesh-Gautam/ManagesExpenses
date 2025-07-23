import { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
const AuthPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(false);
  const toggleAuthMode = () => {
    setIsLogin((prev) => !prev);
  };
  const handleSuccess = (val) => {
    onLogin(val);
  };
  return (
    <div>
      {isLogin ? (
        <Login onToggle={toggleAuthMode} onSuccess={handleSuccess} />
      ) : (
        <SignUp onToggle={toggleAuthMode} />
      )}
    </div>
  );
};

export default AuthPage;
