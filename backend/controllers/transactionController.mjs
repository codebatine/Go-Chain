import {
  createTransaction,
  getTransactionPool,
} from '../services/transactionService.mjs';

export const createNewTransaction = (req, res) => {
  const { sender, recipient, amount } = req.body;
  const transaction = createTransaction(sender, recipient, amount);
  res.status(201).json(transaction);
};

export const getTransactions = (req, res) => {
  res.json(getTransactionPool());
};
