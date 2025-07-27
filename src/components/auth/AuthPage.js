import { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import { useSelector } from "react-redux";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(false); // ✅ local toggle state
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const toggleAuthMode = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div>
      {!isLoggedIn ? (
        isLogin ? (
          <Login onToggle={toggleAuthMode} />
        ) : (
          <SignUp onToggle={toggleAuthMode} />
        )
      ) : (
        <p style={{backgroundColor:'red'}}>You are already logged in.</p>
      )}
    </div>
  );
};

export default AuthPage;
