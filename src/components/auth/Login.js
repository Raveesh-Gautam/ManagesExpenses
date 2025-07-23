import { useState } from "react";
import styles from "./SignUp.module.css";

const Login = ({ onToggle, onSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log("Logging in:", formData);
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAbrBOkpyGDNOKwjYY1pUvkIFvldV5811I",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            returnSecureToken: true,
          }),
        }
      )
        .then((res) => {
          if (res.ok) return res.json();
          else {
            return res.json().then((data) => {
              throw new Error(data.error.message || "Login failed");
            });
          }
        })
        .then((res) => {
          console.log("Login success:", res);
          onSuccess(true);
          localStorage.setItem("token", res.idToken);
          localStorage.setItem("email", res.email);
          alert("Logged in successfully!");
        })
        .catch((err) => {
          console.log(err.message);
          alert(err.message);
        });

      setFormData({
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className={styles.auth}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <h1 className={styles.sign_heading}>Login</h1>

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={`${styles.input} ${
              errors.email ? styles.errorInput : ""
            }`}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={`${styles.input} ${
              errors.password ? styles.errorInput : ""
            }`}
          />

          <button className={styles.signup}>Login</button>
        </form>
        <button className={styles.an_account}>
          Don't have an account? <span onClick={onToggle}> SignUp </span>
        </button>
      </div>
    </div>
  );
};

export default Login;
