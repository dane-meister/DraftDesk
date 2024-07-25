import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token; // Use cookies to get the token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const jwtSecret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, jwtSecret);
    (req as any).user = decoded; // Add the decoded user info to the request object
    
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
