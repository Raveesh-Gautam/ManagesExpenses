import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../App/features/Cart/CartSlice";
import {
    addExpense,
    deleteExpense,
    getTotalExpense,
    updateExpense,
} from "../App/features/expenses/ExpenseSlice";
import styles from "./ExpenseForm.module.css";

const ExpenseForm = () => {
  const totalExpense = useSelector((state) => state.expenses.totalExpense);
  const dispatch = useDispatch();
  const [editingId, setEditingId] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const cartData=useSelector((state)=>state.cart.cartData);

  const [form, setForm] = useState({
    amount: "",
    description: "",
    category: "Food",
  });
const handleAddToCart=(id,amount,category)=>{
dispatch(addToCart({id,amount,category,quantity:1}));

console.log(cartData);
}
  // Fetch expenses from Firebase
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await fetch(
          "https://expensetracker-47692-default-rtdb.firebaseio.com/expenses.json"
        );
        const data = await res.json();

        if (!res.ok) throw new Error("Failed to fetch expenses");

        const loadedExpenses = [];
        let totalVal = 0;

        for (let key in data) {
          const amount = +data[key].amount; 
          totalVal += amount;
          loadedExpenses.push({ id: key, ...data[key], amount });
        }

        setExpenses(loadedExpenses);
        dispatch(getTotalExpense({ totalVal }));
      } catch (err) {
        alert("Error fetching expenses: " + err.message);
      }
    };

    fetchExpenses();
  }, [dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { amount, description, category } = form;

    if (!amount || isNaN(amount)) {
      alert("Please enter a valid amount");
      return;
    }

    const numericAmount = Number(amount);

    if (editingId) {
      const oldExpense = expenses.find((exp) => exp.id === editingId);
      const updatedForm = {
        amount: numericAmount,
        description,
        category,
      };

      const res = await fetch(
        `https://expensetracker-47692-default-rtdb.firebaseio.com/expenses/${editingId}.json`,
        {
          method: "PUT",
          body: JSON.stringify(updatedForm),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.ok) {
        alert("Expense updated");

        setExpenses((prev) =>
          prev.map((item) =>
            item.id === editingId ? { ...item, ...updatedForm } : item
          )
        );

        dispatch(
          updateExpense({
            oldAmount: Number(oldExpense.amount),
            newAmount: numericAmount,
          })
        );

        setEditingId(null);
        setForm({ amount: "", description: "", category: "Food" });
      } else {
        alert("Failed to update");
      }

      return;
    }

    // Add new expense
    const newExpense = {
      amount: numericAmount,
      description,
      category,
    };

    const res = await fetch(
      "https://expensetracker-47692-default-rtdb.firebaseio.com/expenses.json",
      {
        method: "POST",
        body: JSON.stringify(newExpense),
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await res.json();
    if (res.ok) {
      setExpenses((prev) => [...prev, { id: data.name, ...newExpense }]);
      dispatch(addExpense({ amount: numericAmount }));
      setForm({ amount: "", description: "", category: "Food" });
    } else {
      alert("Failed to add expense");
    }
  };

  const handleEdit = (id) => {
    const item = expenses.find((e) => e.id === id);
    setForm({
      amount: item.amount,
      description: item.description,
      category: item.category,
    });
    setEditingId(id);
  };

  const handleDelete = async (id) => {
    const toDelete = expenses.find((e) => e.id === id);
    const res = await fetch(
      `https://expensetracker-47692-default-rtdb.firebaseio.com/expenses/${id}.json`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      setExpenses((prev) => prev.filter((e) => e.id !== id));
      dispatch(deleteExpense({ amount: Number(toDelete.amount) }));
    } else {
      alert("Failed to delete");
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
        <button type="submit">
          {editingId ? "Update Expense" : "Add Expense"}
        </button>
      </form>

     

      <div className={styles.expenseList}>
        <h3>Your Expenses:</h3>
        {expenses.map((exp) => (
          <div key={exp.id} className={styles.expenseItem}>
            <div className={styles.expenses_handle}>
              <div className={styles.cat_des}>
                <div className={styles.category}>{exp.category}</div>
                <p className={styles.des}>{exp.description}</p>
                <div className={styles.amount}>₹{exp.amount}</div>
              </div>

              <div className={styles.btn_edit_del}>
                  <button
                  onClick={() => handleAddToCart(exp.id,exp.amount,exp.category)}
                  className={styles.del_btn}
                >
                  AddToCart
                </button>
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
         <h3 className={styles.totalExpense}>Total Expense: ₹{totalExpense}</h3>
      </div>
    </div>
  );
};

export default ExpenseForm;
