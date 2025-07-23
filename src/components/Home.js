import React, { useState } from "react";
import styles from "./Home.module.css";

const Home = () => {
  const [isComplete, setIsComplete] = useState(false);
  const [contact, setContact] = useState({
    name: "",
    url: ""
  });

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    console.log("Contact Info:", contact);
  
  };

  return (
    <React.Fragment>
      <div className={styles.nav}>
        <div>Welcome to the expense Tracker app</div>
        <div>
          Your Profile is inComplete{" "}
          <span className={styles.span} onClick={() => setIsComplete(true)}>
            please Complete
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
