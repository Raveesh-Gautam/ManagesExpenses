import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../App/features/Auth/AuthSlice";
import ToggleButton from "./ToggleButton";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);
 const totalExpense=useSelector((state)=>state.expenses.totalExpense);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div>

    { totalExpense>=10000? <header className={styles.header}>
      <div>Welcome, {email}</div>
      <ToggleButton />
      <button className={styles.premium}>Premium</button>
      <button onClick={handleLogout}>Logout</button>
    </header>: <header className={styles.header}>
      <div>Welcome, {email}</div>
       <ToggleButton />
      <button onClick={handleLogout}>Logout</button>
    </header>}
   
    </div>
  );
};

export default Header;
