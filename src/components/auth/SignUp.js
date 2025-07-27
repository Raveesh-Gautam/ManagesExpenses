import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredential } from "../../App/features/Auth/AuthSlice";
import styles from "./SignUp.module.css";

const SignUp = ({ onToggle }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    c_password: "",
  });
 const dispatch=useDispatch();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.includes("@") || !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email";
      alert("Invalid email");
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      alert("Password must be at least 6 characters");
    }
    if (formData.c_password !== formData.password) {
      newErrors.c_password = "Passwords do not match";
      alert("Passwords do not match");
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log("Submitted:", formData);
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAbrBOkpyGDNOKwjYY1pUvkIFvldV5811I",
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
              throw new Error(data.error.message || "Signup failed");
            });
          }
        })
        .then((res) => {
          console.log("data api :", res);
          dispatch(setCredential({
    token: res.idToken,
    email: res.email
  }));
          localStorage.setItem("token", res.idToken);
          localStorage.setItem("email", res.email);

          alert("data saved successfully!");
        })
        .catch((err) => {
          console.log(err.message);
          alert(err.message);
        });
      setFormData({
        email: "",
        password: "",
        c_password: "",
      });
    }
  };

  return (
    <div className={styles.auth}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <h1 className={styles.sign_heading}>SignUp</h1>

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
          <input
            name="c_password"
            type="password"
            placeholder="Confirm Password"
            value={formData.c_password}
            onChange={handleChange}
            className={`${styles.input} ${
              errors.c_password ? styles.errorInput : ""
            }`}
          />

          <button className={styles.signup}>SignUp</button>
        </form>

        <button className={styles.an_account}>
          Have an Account?<span onClick={onToggle}>Login</span>
        </button>
      </div>
    </div>
  );
};

export default SignUp;
