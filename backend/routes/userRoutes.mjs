import express from 'express';
import {
  register,
  login,
  getMe,
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '../controllers/userController.mjs';
import { protect, admin } from '../middleware/authMiddleware.mjs';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', getMe);
router.post('/users', protect, admin, createUser);
router.delete('/users/:id', protect, admin, deleteUser);
router.get('/users/:id', protect, admin, getUser);
router.get('/users', protect, admin, getUsers);
router.put('/users/:id', protect, admin, updateUser);

export default router;
