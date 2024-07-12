import mongoose, { Schema, Document, Model } from 'mongoose';

// Define an interface for the User document
interface IUser extends Document {
  email: string;
  password: string;
  penName: string;
  isAdmin: boolean;
  memberSince: Date;
  projects: mongoose.Types.ObjectId[];
  url: string;
}

// Define the User schema
const UsersSchema: Schema = new Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: [/\S+@\S+\.\S+/, 'is invalid'], 
    index: true 
  },
  password: { type: String, required: true },
  penName: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  memberSince: { type: Date, default: Date.now },
  projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }]
});

// Create a virtual property 'url' for the User schema
UsersSchema.virtual('url').get(function (this: IUser) {
  return '/users/' + this._id;
});

// Define the User model
const Users: Model<IUser> = mongoose.model<IUser>('Users', UsersSchema);

export default Users;
