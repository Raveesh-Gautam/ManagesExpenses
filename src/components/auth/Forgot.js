import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Forgot.module.css";

const Forgot = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSendLink = async () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }

    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAbrBOkpyGDNOKwjYY1pUvkIFvldV5811I",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: email,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        navigate("/");

        alert("Password reset link sent! Check your email.");
      } else {
        alert(data.error.message || "Something went wrong.");
      }
    } catch (err) {
      alert("Error sending password reset email.");
    }
  };

  return (
    <div className={styles.main}>
      <h3 className={styles.heading}>
        Enter the email with which you already registered
      </h3>
      <div className={styles.input_handle}>
        <input
          type="email"
          name="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button className={styles.send_btn} onClick={handleSendLink}>
        Send Link
      </button>
    </div>
  );
};

export default Forgot;
