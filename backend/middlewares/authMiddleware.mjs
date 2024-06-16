import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const protect = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('No token provided.');

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(500).send('Failed to authenticate token.');
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

export const admin = (req, res, next) => {
  if (req.userRole && req.userRole === 'admin') {
    next();
  } else {
    res.status(403).send('User is not an admin.');
  }
};
