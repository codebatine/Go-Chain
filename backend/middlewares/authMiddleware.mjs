import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { asyncHandler } from './asyncHandler.mjs';
import ErrorResponse from '../utilities/errorResponse.mjs';

dotenv.config();

export const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('No token provided or wrong format.');
    return next(new ErrorResponse('No token provided or wrong format.', 403));
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (err) {
    console.log('Failed to authenticate token:', err);
    return next(new ErrorResponse('Failed to authenticate token.', 500));
  }
});

export const admin = asyncHandler((req, res, next) => {
  if (req.userRole && req.userRole === 'admin') {
    next();
  } else {
    return next(new ErrorResponse('User is not an admin.', 403));
  }
});
