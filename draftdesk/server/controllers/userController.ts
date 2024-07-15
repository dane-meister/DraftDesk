// userController.ts

import { Request, Response } from 'express';
import User from '../models/Users'; 

export const getUserById = async (req: Request, res: Response) => {
    const userId = (req as any).user.userId; // Use the user ID from the token
    try {
        // Fetch user data from MongoDB using Mongoose
        const user = await User.findById(userId)
        user?.populate('projects'); // Populate projects if stored as references

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Extract relevant user data to return
        const userData = {
            email: user.email,
            penName: user.penName,
            isAdmin: user.isAdmin,
            memberSince: user.memberSince,
            projects: user.projects, 
        };

        res.status(200).json(userData);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
