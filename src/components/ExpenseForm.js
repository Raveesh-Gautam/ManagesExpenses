import { useEffect, useState } from "react";
import styles from "./ExpenseForm.module.css";

const ExpenseForm = () => {
  const [editingId, setEditingId] = useState(null);

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

  if (editingId) {
    try {
      const res = await fetch(
        `https://expensetracker-47692-default-rtdb.firebaseio.com/expenses/${editingId}.json`,
        {
          method: "PUT",
          body: JSON.stringify(form),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        alert("Expense updated");

        setExpenses((prev) =>
          prev.map((item) =>
            item.id === editingId ? { ...item, ...form } : item
          )
        );

        setEditingId(null);
        setForm({ amount: "", description: "", category: "Food" });
      } else {
        const data = await res.json();
        alert(data?.message || "Update failed");
      }
    } catch (err) {
      alert("Error while updating");
    }

    return; 
  }

  try {
    const res = await fetch(
      'https://expensetracker-47692-default-rtdb.firebaseio.com/expenses.json', 
      {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const postedData = await res.json();
    if (res.ok) {
      alert("Expense Added.");
      setExpenses((prev) => [...prev, { id: postedData.name, ...form }]); 
    } else {
      alert(postedData?.error?.message || "Something went wrong.");
    }
  } catch (err) {
    alert("Expenses not added. Check your data or API.");
  }

  setForm({ amount: "", description: "", category: "Food" });
};

  const handleEdit = (id) => {
  const expenseToEdit = expenses.find((exp) => exp.id === id);
  if (expenseToEdit) {
    setForm({
      amount: expenseToEdit.amount,
      description: expenseToEdit.description,
      category: expenseToEdit.category,
    });
    setEditingId(id); 
  }

  }
   
  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `https://expensetracker-47692-default-rtdb.firebaseio.com/expenses/${id}.json`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        alert("Expense deleted");
        setExpenses((prev) => prev.filter((exp) => exp.id !== id));
      } else {
        const data = await res.json();
        alert("API failed: " + (data?.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Something went wrong in delete API");
    }
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
            <div className={styles.expenses_handle}>
              <div className={styles.cat_des}>
                <div className={styles.category}>{exp.category}</div>
                <p className={styles.des}>{exp.description}</p>
                <div className={styles.amount}>${exp.amount}</div>
              </div>

              <div className={styles.btn_edit_del}>
                <button
                  onClick={() => handleEdit(exp.id)}
                  className={styles.edit_btn}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(exp.id)}
                  className={styles.del_btn}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseForm;
