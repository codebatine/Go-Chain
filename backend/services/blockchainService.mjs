import Blockchain from '../models/Blockchain.mjs';
import {
  getValidTransactions,
  clearTransactionPool,
} from './transactionService.mjs';
import Block from '../models/Block.mjs';
import mongoose from 'mongoose';

const blockchain = new Blockchain();

export const mineBlock = (minerAddress) => {
  const transactions = getValidTransactions();
  const rewardTransaction = {
    sender: 'system',
    recipient: minerAddress,
    amount: 1,
    timestamp: Date.now(),
  };
  transactions.push(rewardTransaction);
  const newBlock = blockchain.createBlock(transactions);
  clearTransactionPool();
  saveBlockToDB(newBlock);
  return newBlock;
};

export const getBlockchain = () => {
  return blockchain.chain;
};

const saveBlockToDB = async (block) => {
  const blockModel = new mongoose.model(
    'Block',
    new mongoose.Schema({
      index: Number,
      previousHash: String,
      timestamp: Date,
      transactions: Array,
      hash: String,
    }),
  );
  const newBlock = new blockModel(block);
  await newBlock.save();
};
