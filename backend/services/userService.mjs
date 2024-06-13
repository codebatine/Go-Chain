import User from '../models/User.mjs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export const registerUser = async (username, password, role) => {
  const user = new User({ username, password, role });
  await user.save();
  return user;
};

export const authenticateUser = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error('User not found');
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid password');
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' },
  );
  return { user, token };
};

export const getUserById = async (id) => {
  return User.findById(id);
};
