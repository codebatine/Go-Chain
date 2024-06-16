import express from 'express';
import { getBlocks, mine } from '../controllers/blockchainController.mjs';
import { protect, admin } from '../middlewares/authMiddleware.mjs';

const router = express.Router();

router.get('/blocks', protect, admin, getBlocks);
router.post('/mine', protect, admin, mine);

export default router;
