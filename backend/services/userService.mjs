import User from '../models/User.mjs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export const registerUserService = async (username, password, role) => {
  const user = new User({ username, password, role });
  await user.save();
  return user;
};

export const authenticateUserService = async (username, password) => {
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

export const createUserService = async (userData) => {
  const user = new User(userData);
  await user.save();
  return user;
};

export const deleteUserService = async (userId) => {
  return User.findByIdAndDelete(userId);
};

export const getUserService = async (userId) => {
  return User.findById(userId);
};

export const getUsersService = async () => {
  return User.find({});
};

export const updateUserService = async (userId, userData) => {
  return User.findByIdAndUpdate(userId, userData, { new: true });
};

export const getUserByEmail = async (email) => {
  return User.findOne({ email });
};
