import express from 'express';
import {
  createNewTransaction,
  getTransactions,
} from '../controllers/transactionController.mjs';
import { authMiddleware } from '../middlewares/authMiddleware.mjs';

const router = express.Router();

router.post('/transactions', authMiddleware, createNewTransaction);
router.get('/transactions', authMiddleware, getTransactions);

export default router;
