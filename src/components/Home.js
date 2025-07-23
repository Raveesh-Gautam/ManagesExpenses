import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../store/AuthProvider";
import styles from "./Home.module.css";

const Home = () => {
  const { token } = useContext(AuthContext);
  const [isComplete, setIsComplete] = useState(false);
  const [contact, setContact] = useState({
    name: "",
    url: "",
  });

  useEffect(() => {
    if (!token) return;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAbrBOkpyGDNOKwjYY1pUvkIFvldV5811I",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken: token }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const user = data.users?.[0];
        if (user) {
          setContact({
            name: user.displayName || "",
            url: user.photoUrl || "",
          });
        }
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  }, [token]);

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };
  const handleVarifyEmail = () => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAbrBOkpyGDNOKwjYY1pUvkIFvldV5811I",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            throw new Error(data.error.message || "Varification failed");
          });
        }
      })
      .then((res) => {
        console.log("Email sent to:", res.email);
        alert("Email varification send");
      })
      .catch((err) => {
        alert("Invalid Email", err.message);
      });
  };
  const handleUpdate = () => {
    if (contact.name.trim().length <= 0 || contact.url.trim().length < 5) {
      alert("Please enter valid name and photo URL");
      return;
    }

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAbrBOkpyGDNOKwjYY1pUvkIFvldV5811I",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: token,
          displayName: contact.name,
          photoUrl: contact.url,
          returnSecureToken: true,
        }),
      }
    )
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((data) => {
          throw new Error(data.error.message || "Update failed");
        });
      })
      .then((data) => {
        alert("Profile updated successfully!");
        setIsComplete(false);
      })
      .catch((err) => {
        console.error("Error:", err.message);
        alert(err.message);
      });
  };

  return (
    <React.Fragment>
      <div className={styles.nav}>
        <div>Welcome to the Expense Tracker App</div>
        <div>
          Your profile is incomplete{" "}
          <span className={styles.span} onClick={() => setIsComplete(true)}>
            Please complete
          </span>
        </div>
      </div>

      <div className={styles.contact}>
        {isComplete && (
          <div className={styles.contactForm}>
            <div className={styles.buttonGroup}>
              <h2 className={styles.heading}>Contact Details</h2>
              <button
                className={`${styles.button} ${styles.cancel}`}
                onClick={() => setIsComplete(false)}
              >
                Cancel
              </button>
            </div>

            <label>
              Full Name:
              <input
                type="text"
                name="name"
                value={contact.name}
                onChange={handleChange}
              />
            </label>
            <label>
              Profile Photo URL:
              <input
                type="text"
                name="url"
                value={contact.url}
                onChange={handleChange}
              />
            </label>

            <div className={styles.buttonGroup}>
              <button
                className={`${styles.button} ${styles.update}`}
                onClick={handleUpdate}
              >
                Update
              </button>
              <button
                className={`${styles.button} ${styles.update}`}
                onClick={handleVarifyEmail}
              >
                Verify Email
              </button>
            </div>
            <hr />
          </div>
        )}
      </div>
      <hr />
    </React.Fragment>
  );
};

export default Home;
