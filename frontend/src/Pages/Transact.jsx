import { useState } from 'react';
import { createTransaction } from '../utilities/api';

const Transact = () => {
  const [sender, setSender] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const handleTransactionSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming token retrieval is handled elsewhere
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login.');
        window.location.href = '/login';
        return;
      }

      // Call API to create transaction
      const transactionData = { sender, recipient, amount };
      const response = await createTransaction(transactionData, token);
      console.log('Transaction created:', response);
      // Optionally handle success UI or redirect
    } catch (error) {
      console.error('Error creating transaction:', error.message);
      // Handle error UI or feedback to user
    }
  };

  return (
    <div className="container">
      <h1>Transactions</h1>
      <form onSubmit={handleTransactionSubmit}>
        <label>
          Sender:
          <input
            type="text"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            required
          />
        </label>
        <label>
          Recipient:
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit Transaction</button>
      </form>
    </div>
  );
};

export default Transact;
