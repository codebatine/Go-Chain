import User from '../models/User.mjs';
import {
  registerUser,
  authenticateUser,
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '../services/userService.mjs';

// Existing code...

// @desc Create a new user
// @route POST /api/auth/users
// @access Private/Admin
export const createUser = async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc Delete a user
// @route DELETE /api/auth/users/:id
// @access Private/Admin
export const deleteUser = async (req, res, next) => {
  try {
    await deleteUser(req.params.id);
    res.status(204).json({ message: 'User deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc Get a user
// @route GET /api/auth/users/:id
// @access Private/Admin
export const getUser = async (req, res, next) => {
  try {
    const user = await getUser(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc Get all users
// @route GET /api/auth/users
// @access Private/Admin
export const getUsers = async (req, res, next) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc Update a user
// @route PUT /api/auth/users/:id
// @access Private/Admin
export const updateUser = async (req, res, next) => {
  try {
    const user = await updateUser(req.params.id, req.body);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
