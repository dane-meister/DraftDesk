import { Request, Response } from 'express';
import Project from '../models/Projects';

export const createProject = async (req: Request, res: Response) => {
    const { name, description, tags } = req.body;
    console.log("Creating project...");
    console.log((req as any).user.userId as String)
    const user = (req as any).user.userId as String;// Placeholder
    const coverImage = null;
    /*if (!req.user) {
        return res.status(401).json({ message: 'Authentication required' });
    }*/

    try {
        const newProject = new Project({
        name: name,
        description: description,
        coverImage: coverImage,
        tags: tags,
        user: user,
        timeCreated: new Date(),
        });

        const project = await newProject.save();
        console.log(project)

        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ message: 'Error creating project', error });
    }
};


