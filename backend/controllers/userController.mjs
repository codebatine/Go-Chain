import * as userService from '../services/userService.mjs';
import { asyncHandler } from '../middlewares/asyncHandler.mjs';
import ErrorResponse from '../utilities/errorResponse.mjs';

// @desc Register user
// @route POST /api/auth/register
// @access Public
export const register = asyncHandler(async (req, res, next) => {
  const { name, username, email, password, role } = req.body; // Add role to the destructured properties
  const userExists = await userService.getUserByEmail(email);
  if (userExists) {
    return next(new ErrorResponse('User already exists', 400));
  }
  const user = await userService.createUserService({
    name,
    username,
    email,
    password,
    role, // Add role to the user creation service
  });
  if (user) {
    const token = user.getSignedJwtToken();
    res.status(201).json({ success: true, token });
  } else {
    return next(new ErrorResponse('Invalid user data', 400));
  }
});

// @desc Login user
// @route POST /api/auth/login
// @access Public
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }
  const user = await userService.getUserByEmail(email);
  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }
  const token = user.getSignedJwtToken();
  res.status(200).json({ success: true, token });
});

// @desc Get current user
// @route GET /api/auth/me
// @access Private
export const getMe = asyncHandler(async (req, res, next) => {
  const user = await userService.getUser(req.userId);
  if (!user) {
    return next(new ErrorResponse(`No user found with id: ${req.userId}`));
  }
  res.status(200).json({ success: true, statusCode: 200, data: user });
});

// @desc Create a new user
// @route POST /api/auth/users
// @access Private/Admin
export const createUser = asyncHandler(async (req, res, next) => {
  const user = await userService.createUserService(req.body);
  res.status(201).json({ success: true, statusCode: 201, data: user });
});

// @desc Delete a user
// @route DELETE /api/auth/users/:id
// @access Private/Admin
export const deleteUser = asyncHandler(async (req, res, next) => {
  await userService.deleteUser(req.params.id);
  res.status(204).send();
});

// @desc Get a user
// @route GET /api/auth/users/:id
// @access Private/Admin
export const getUser = asyncHandler(async (req, res, next) => {
  const user = await userService.getUser(req.params.id);
  if (!user) {
    return next(new ErrorResponse(`No user found with id: ${req.params.id}`));
  }
  res.status(200).json({ success: true, statusCode: 200, data: user });
});

// @desc Get all users
// @route GET /api/auth/users
// @access Private/Admin
export const getUsers = asyncHandler(async (req, res, next) => {
  const users = await userService.getUsers();
  res.status(200).json({ success: true, statusCode: 200, data: users });
});

// @desc Update a user
// @route PUT /api/auth/users/:id
// @access Private/Admin
export const updateUser = asyncHandler(async (req, res, next) => {
  await userService.updateUser(req.params.id, req.body);
  res.status(204).send();
});
