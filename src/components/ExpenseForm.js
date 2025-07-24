import { useEffect, useState } from "react";
import styles from "./ExpenseForm.module.css";

const ExpenseForm = () => {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    amount: "",
    description: "",
    category: "Food",
  });

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await fetch(
          'https://expensetracker-47692-default-rtdb.firebaseio.com/"expenses".json'
        );
        const data = await res.json();

        if (res.ok) {
          const loadedExpenses = [];

          for (let key in data) {
            loadedExpenses.push({
              id: key,
              ...data[key],
            });
          }
          console.log(data);

          setExpenses(loadedExpenses);
        } else {
          alert(data.error?.message || "Something went wrong.");
        }
      } catch (err) {
        alert("Something went wrong while fetching expenses.");
      }
    };

    fetchExpenses();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setExpenses((prev) => [...prev, form]);
    try {
      const res = await fetch(
        'https://expensetracker-47692-default-rtdb.firebaseio.com/"expenses".json',
        {
          method: "POST",
          body: JSON.stringify({
            amount: form.amount,
            description: form.description,
            category: form.category,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const postedData = await res.json();
      if (res.ok) {
        alert("Expenses Added.");
      } else {
        alert(postedData.error.message || "Something went wrong.");
      }
    } catch (err) {
      alert("Expenses not added check your data or api ");
    }

    setForm({ amount: "", description: "", category: "Food" });
  };

  return (
    <div className={styles.container}>
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <select name="category" value={form.category} onChange={handleChange}>
          <option value="Food">Food</option>
          <option value="Petrol">Petrol</option>
          <option value="Salary">Salary</option>
        </select>
        <button type="submit">Add Expense</button>
      </form>

      <div className={styles.expenseList}>
        <h3>Your Expenses:</h3>
        {expenses.map((exp, idx) => (
          <div key={idx} className={styles.expenseItem}>
            <div className={styles.cat_des}>
              <div className={styles.category}>{exp.category}</div>
              <p className={styles.des}>{exp.description}</p>
            </div>
            <div className={styles.amount}>${exp.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseForm;
