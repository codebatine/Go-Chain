import express from 'express';
import { getBlocks, mine } from '../controllers/blockchainController.mjs';
import { authMiddleware } from '../middlewares/authMiddleware.mjs';

const router = express.Router();

router.get('/blocks', authMiddleware, getBlocks);
router.post('/mine', authMiddleware, mine);

export default router;
