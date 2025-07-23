import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [email, setEmail] = useState(localStorage.getItem("email") || null);

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    if (email) localStorage.setItem("email", email);
  }, [token, email]);

  const logout = () => {
    setToken(null);
    setEmail(null);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };

  return (
    <AuthContext.Provider value={{ token, email, setToken, setEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
