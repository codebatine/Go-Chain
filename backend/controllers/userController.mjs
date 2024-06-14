// @desc Register a new user
// @route POST /api/auth/register
// @access Public
export const register = async (req, res, next) => {
  res.status(201).json({
    success: true,
    statusCode: 201,
    message: 'register works',
  });

  const { username, password, role } = req.body;
  const user = await registerUser(username, password, role);
  res.status(201).json(user);
};

// @desc Login a user
// @route POST /api/auth/login
// @access Public
export const login = async (req, res, next) => {
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'login works',
  });

  const { username, password } = req.body;
  try {
    const { user, token } = await authenticateUser(username, password);
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc Get user profile
// @route GET /api/register
// @access Public
export const getMe = async (req, res, next) => {
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'getMe works',
  });

  const user = await getUserById(req.userId);
  res.json(user);
};
import { registerUser, authenticateUser } from '../services/userService.mjs';
