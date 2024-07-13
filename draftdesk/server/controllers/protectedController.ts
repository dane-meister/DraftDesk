import { Request, Response } from 'express';
import User from '../models/Users';

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    // Retrieve user information from the request object, which was set by the authentication middleware
    const userId = (req as any).user.userId;

    // Fetch user information from the database
    const user = await User.findById(userId).select('-password'); // Exclude the password from the response
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve user profile' });
  }
};
