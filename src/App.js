import React, { useState } from 'react';
import './styles/App.scss';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const addTransaction = () => {
    if (amount && description) {
      setTransactions([...transactions, { amount: parseFloat(amount), description }]);
      setAmount('');
      setDescription('');
    }
  };

  const totalIncome = transactions
    .filter(item => item.amount > 0)
    .reduce((acc, item) => acc + item.amount, 0);

  const totalExpense = transactions
    .filter(item => item.amount < 0)
    .reduce((acc, item) => acc + item.amount, 0);

  const totalBalance = totalIncome + totalExpense;

  return (
    <div className="expense-app">
      <h1>Expense Tracker</h1>
      <div className="expense-form">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <button onClick={addTransaction}>Add Transaction</button>
      </div>
      <div className="summary">
        <h3>Balance: ${totalBalance.toFixed(2)}</h3>
        <h3>Income: ${totalIncome.toFixed(2)}</h3>
        <h3>Expenses: ${totalExpense.toFixed(2)}</h3>
      </div>
      <ul className="transaction-list">
        {transactions.map((item, index) => (
          <li key={index} className={item.amount < 0 ? 'expense' : 'income'}>
            {item.description}: ${item.amount.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
