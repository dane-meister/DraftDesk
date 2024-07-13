import mongoose, { Schema, Document, Model } from 'mongoose';

interface IProject extends Document {
  name: string;
  user: mongoose.Types.ObjectId;
  chapters: mongoose.Types.ObjectId[];
}

const ProjectSchema: Schema = new Schema({
  name: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  chapters: [{ type: Schema.Types.ObjectId, ref: 'Chapter' }]
});

const Project: Model<IProject> = mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
