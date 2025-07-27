import React, { useDebugValue } from 'react';
import styles from './Cart.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { removeToCart } from '../../App/features/Cart/CartSlice';

const Cart = () => {
  const cartData = useSelector((state) => state.cart.cartData);
  const totalCartAmount = useSelector((state) => state.cart.totalCartAmount);
  const dispatch=useDispatch();
  const handleDelete=(id,amount,quantity)=>{
   dispatch(removeToCart({id,amount,quantity}))
  }

  return (
    <div>
      <div className={styles.spCart}>Shopping Cart</div>
      <p className={styles.p}>Price</p>
      <hr />
      {cartData.map((ele, id) => (
        <div className={styles.cartItem} key={id}>
          <div className={styles.img}>
            <img src='test_img.jpg' width='140px' alt='' />
          </div>
          <div className={styles.top}>
            <div className={styles.top_des_price}>
              <div>{ele.category}</div>
              <div>${ele.amount}</div>
            </div>
            <div className={styles.bottom}>
              <button className={styles.del_btn} onClick={()=>handleDelete(ele.id,ele.amount,ele.quantity)}>X</button>
              <label className={styles.quantity}>
                Quantity
                <input
                  type='number'
                  name='quant'
                  className={styles.input}
                  value={ele.quantity}
                  readOnly
                />
              </label>
            </div>
          </div>
        </div>
        
        
      ))}
      <p className={styles.total_payable}>Totol payable Amount <span className={styles.dollar}>${totalCartAmount}</span></p>
    </div>
  );
};

export default Cart;
