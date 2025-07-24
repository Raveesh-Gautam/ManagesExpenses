import React, { useState } from "react";
import styles from "./ExpenseForm.module.css";

const ExpenseForm = () => {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    amount: "",
    description: "",
    category: "Food",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setExpenses((prev) => [...prev, form]);
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
            ${exp.amount} - {exp.description} [{exp.category}]
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseForm;
