import { v4 as uuidv4 } from 'uuid';
import Transaction from '../models/Transaction.mjs';

let transactionPool = [];

export const addTransactionToPool = (transaction) => {
  transactionPool.push(transaction);
};

export const getTransactionPool = () => {
  return transactionPool;
};

export const clearTransactionPool = () => {
  transactionPool = [];
};

export const createTransaction = (sender, recipient, amount) => {
  const transaction = new Transaction({
    id: uuidv4(),
    sender,
    recipient,
    amount,
    timestamp: Date.now(),
  });
  addTransactionToPool(transaction);
  return transaction;
};

export const getValidTransactions = () => {
  // Validate if needed
  return transactionPool;
};
