import { useContext } from "react";
import AuthContext from "../store/AuthProvider";

import styles from "./Header.module.css";

const Header = () => {
  const { logout, email } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
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
