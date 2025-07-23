import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Home from "./components/Home";
import { useState } from "react";


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login onSuccess={() => setIsLoggedIn(true)} />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};
export default App;
