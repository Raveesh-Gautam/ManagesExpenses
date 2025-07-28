import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../App/features/Auth/AuthSlice";
import ToggleButton from "./ToggleButton";
import { useState } from "react";
import Cart from "./Cart/Cart";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const email = useSelector((state) => state.auth.email);
  const totalCartItem = useSelector((state) => state.cart.cartData);
  let totalSubTitle = 0;
  for (let i = 0; i < totalCartItem.length; i++) {
    totalSubTitle += totalCartItem[i].quantity;
  }
  const totalExpense = useSelector((state) => state.expenses.totalExpense);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleCart = () => {
    setShow((prev) => !prev);
    navigate("/cart")
  };
  return (
    <div>
      {totalExpense >= 10000 ? (
        <header className={styles.header}>
          <div>Welcome, {email}</div>
          <ToggleButton />
          <button className={styles.premium}>Premium</button>
        
          <div className={styles.cart} onClick={handleCart}>
            <img src="/cartIcon.jpg" alt="" /> <span>{totalSubTitle}</span>
          </div>
          <button onClick={handleLogout}>Logout</button>
        </header>
      ) : (
        <header className={styles.header}>
          <div>Welcome, {email}</div>
          <ToggleButton />
          <div>Cart</div>
          <button onClick={handleLogout}>Logout</button>
        </header>
      )}
    </div>
  );
};

export default Header;
