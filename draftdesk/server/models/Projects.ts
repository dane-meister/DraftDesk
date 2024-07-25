import mongoose, { Schema, Document, Model } from 'mongoose';

interface IProject extends Document {
  name: string;
  description?: string;
  coverImage?: string;
  tags?: string[];
  user: mongoose.Types.ObjectId;
  timeCreated: Date;
  chapters: mongoose.Types.ObjectId[];
}

const ProjectSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  coverImage: { type: String, required: false },
  tags: [{ type: String, required: false }],
  user: { type: Schema.Types.ObjectId, ref: 'User', required: false },
  timeCreated: { type: Date, default: Date.now },
  chapters: [{ type: Schema.Types.ObjectId, ref: 'Chapter', required: false }]
});

const Project: Model<IProject> = mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
