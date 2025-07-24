import { useContext } from "react";
import AuthContext from "../store/AuthProvider";

import styles from "./Header.module.css";
// import { useNavigate } from "react-router-dom";

const Header = () => {
    // const navigate=useNavigate();
  const { logout, email } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
    // navigate('/login')
    window.location.href = "/login.html";
  };
  return (
    <header className={styles.header}>
      <div>Welcome, {email}</div>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
};

export default Header;
