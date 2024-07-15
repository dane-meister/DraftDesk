import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieparser from 'cookie-parser';
import path, { parse } from 'path';
import helmet from 'helmet';
import { register, login, logout, validateRegister, limiter, verifyToken } from './controllers/authController';
import { authenticateToken } from './middleware/authenticateToken';
import { getUserById } from './controllers/userController';


// Import and register models models
import { registerModels } from './models';
registerModels();

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error('JWT_SECRET environment variable is not defined');
}

// Middleware
app.use(helmet()); // Set security headers
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieparser());
 
app.get('/', (req, res) => {
  res.send('DraftDesk API');
});

// Auth Routes
app.post('/register', limiter, validateRegister, register);
app.post('/login', login);
app.post('/logout', logout);
app.get('/verifyToken', verifyToken);
app.get('/authToken', authenticateToken)

// User Routes
app.get('/user', authenticateToken, getUserById);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error('MONGO_URI environment variable is not defined');
}

mongoose.connect(mongoUri).then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });
