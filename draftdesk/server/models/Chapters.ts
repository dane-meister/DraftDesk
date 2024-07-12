import mongoose, { Schema, Document, Model } from 'mongoose';

interface IChapter extends Document {
  title?: string;
  chapterNumber?: number;
  project: mongoose.Types.ObjectId;
  pages: mongoose.Types.ObjectId[];
}

const ChapterSchema: Schema = new Schema({
  title: { type: String, required: false },
  chapterNumber: { type: Number, required: false },
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  pages: [{ type: Schema.Types.ObjectId, ref: 'Page' }]
});

ChapterSchema.pre('validate', function (next) {
  if (!this.title && !this.chapterNumber) {
    next(new Error('Chapter must have either a title or a chapter number.'));
  } else {
    next();
  }
});

const Chapter: Model<IChapter> = mongoose.model<IChapter>('Chapter', ChapterSchema);

export default Chapter;
