import { registerUser, authenticateUser } from '../services/userService.mjs';

export const register = async (req, res) => {
  const { username, password, role } = req.body;
  const user = await registerUser(username, password, role);
  res.status(201).json(user);
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const { user, token } = await authenticateUser(username, password);
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
