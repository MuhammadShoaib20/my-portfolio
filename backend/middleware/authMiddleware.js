import jwt from 'jsonwebtoken';
import User from '../models/User.js';   // add .js

// Protect routes
export const protect = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');
      return next();
    }
    return res.status(401).json({ message: 'Not authorized, no token' });
  } catch (err) {
    return res.status(401).json({ message: 'Not authorized' });
  }
};

// Role-based access – only for write operations
<<<<<<< HEAD
export const authorize = (...roles) => (req, res, next) => {
=======
const authorize = (...roles) => (req, res, next) => {
>>>>>>> c2666b0f75ea74911a07bc6f93407a3e91fee00f
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};

// Viewer can only GET data, not modify anything
<<<<<<< HEAD
export const allowViewerReadOnly = (req, res, next) => {
=======
const allowViewerReadOnly = (req, res, next) => {
>>>>>>> c2666b0f75ea74911a07bc6f93407a3e91fee00f
  if (req.user.role === 'viewer' && req.method !== 'GET') {
    return res.status(403).json({
      message: 'Viewer accounts cannot modify data. Only superadmin can perform this action.'
    });
  }
  next();
<<<<<<< HEAD
};
=======
};

module.exports = { protect, authorize, allowViewerReadOnly };
>>>>>>> c2666b0f75ea74911a07bc6f93407a3e91fee00f
