import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';
import User from '../models/Users'; 
import next from 'next';

// Rate limiter to prevent brute-force attacks
export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many accounts created from this IP, please try again after 15 minutes'
});

export const verifyToken = (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const jwtSecret = process.env.JWT_SECRET as string;
    jwt.verify(token, jwtSecret);
    res.status(200).json({ message: 'Token is valid' });
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// User input validation
export const validateRegister = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  body('penName').not().isEmpty().withMessage('Pen Name is required')
];

export const register = async (req: Request, res: Response) => {
  // Validate user input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, penName } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // Hash the password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create a new user
    const newUser = new User({ email: email, password: hashedPassword, penName: penName });
    const user = await newUser.save();

    const jwtSecret = process.env.JWT_SECRET as string;

    const token = jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: '1h', // Token expires in 1 hour
    });

    res.cookie('token', token, { 
      httpOnly: true, // Prevent cookie from being accessed by client-side scripts
      secure: process.env.NODE_ENV === 'production' ? true : false, // Set secure to true in production
      sameSite: 'strict' // Cookie can only be sent in same-site requests
     });

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to register user' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body; 

  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } 
    const user = await User.findOne({ email });
    const jwtSecret = process.env.JWT_SECRET as string;
    if (!user) {
      return res.status(404).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: '1h', // Token expires in 1 hour
    });
    res.cookie('token', token, { 
      httpOnly: true, // Prevent cookie from being accessed by client-side scripts
      secure: process.env.NODE_ENV === 'production' ? true : false, // Set secure to true in production
      sameSite: 'strict' // Cookie can only be sent in same-site requests
     });

    res.status(200).json({ message: 'Logged in successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to log in' });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    // Clear the token cookie
    res.clearCookie('token', {
      httpOnly: true, // Prevent client-side access to the cookie
      secure: process.env.NODE_ENV === 'production' ? true : false, // Ensure secure is true in production
      sameSite: 'strict', // Mitigate CSRF attacks
    });

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Failed to log out' });
  }
};

