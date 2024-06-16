import express from 'express';
import {
  createNewTransaction,
  getTransactions,
} from '../controllers/transactionController.mjs';
import { protect } from '../middlewares/authMiddleware.mjs';

const router = express.Router();

router.post('/transactions', protect, createNewTransaction);
router.get('/transactions', protect, getTransactions);

export default router;
