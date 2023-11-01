import { Schema, model } from 'mongoose';
import { INote, NoteModel } from './note.interface';

const NoteSchema = new Schema<INote>(
  {
    id: {
      type: String,
      unique: true,
    },
    title: {
      type: String,
    },
    userID: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    noteDescription: {
      type: String,
      required: true,
    },
    date: {
      type: String,
    },
    pinNote: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
    },
    bgColor: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Note = model<INote, NoteModel>('notes', NoteSchema);
