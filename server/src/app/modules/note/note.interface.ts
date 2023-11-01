import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type INote = {
  id: string;
  title: string;
  noteDescription: string;
  date: string;
  category: string;
  pinNote: boolean;
  userID: Types.ObjectId|IUser;
  image: string;
  bgColor: string;
};

export type NoteModel = Model<INote>;

export type INoteFilters = {
  searchTerm?: string;
};
