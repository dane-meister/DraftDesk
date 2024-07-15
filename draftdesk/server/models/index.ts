import mongoose from 'mongoose';
import User from './Users';
import Project from './Projects';
import Chapter from './Chapters';
import Page from './Pages';

// Ensure all models are registered
export const registerModels = () => {
  // Import each model
  mongoose.model('User', User.schema);
  mongoose.model('Project', Project.schema);
  mongoose.model('Chapter', Chapter.schema);
  mongoose.model('Page', Page.schema);
};

export {
  User,
  Project,
  Chapter,
  Page,
};
