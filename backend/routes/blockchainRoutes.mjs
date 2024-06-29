import express from 'express';
import { getBlocks, mine } from '../controllers/blockchainController.mjs';
import { protect } from '../middlewares/authMiddleware.mjs';

const router = express.Router();

router.get('/blocks', protect, getBlocks);
router.post('/mine', protect, mine);

export default router;
