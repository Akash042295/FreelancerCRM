import  jwt from 'jsonwebtoken';
import User from '../models/User.js';

// // Protect Routes against unauthorized requests (Validates JWT)
export const protect = async (req, res, next) => {
  let token;

  // Read token from authorization headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
  }

  try {
    // Decode token parameters
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user and append profile entity payload to request context
    req.user = await User.findById(decoded.id);

    // console.log("DEBUG AUTH:", { userFound: !!req.user, status: req.user?.status, userRole: req.user?.role });

    if (!req.user || !req.user.status) {
      return res.status(401).json({ success: false, message: 'User session invalid or deactivated' });
    }
    

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Token verification failed' });
  }
};


// Authorize roles matching the operational boundaries
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: `User role '${req.user?.role || 'guest'}' is unauthorized for this action` 
      });
    }
    next();
  };
};
