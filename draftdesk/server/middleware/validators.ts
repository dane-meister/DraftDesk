import { Request, Response, NextFunction } from 'express';

export const validateProjectFields = (req: Request, res: Response, next: NextFunction) => {
    const { name, description, tags } = req.body;
    /*
    console.log("name");
    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ message: 'Project name is required and must be a non-empty string' });
    }
    console.log("desc");
    if (description && typeof description !== 'string') {
        return res.status(400).json({ message: 'Description must be a string' });
    }
    console.log("tags");
    if (tags && !Array.isArray(tags)) {
        return res.status(400).json({ message: 'Tags must be an array of strings' });
    }

    // Additional validation can be added as needed
    */
    next();
};
