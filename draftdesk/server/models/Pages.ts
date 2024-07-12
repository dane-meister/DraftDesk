import mongoose, { Schema, Document, Model } from 'mongoose';

interface IPage extends Document {
  textContent: string;
  chapter: mongoose.Types.ObjectId;
}

const PageSchema: Schema = new Schema({
  textContent: { type: String, required: true },
  chapter: { type: Schema.Types.ObjectId, ref: 'Chapter', required: true }
});

const Page: Model<IPage> = mongoose.model<IPage>('Page', PageSchema);

export default Page;
