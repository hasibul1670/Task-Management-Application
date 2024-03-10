import { customDateFormat } from '../../../helpers/customDateFormat';
import { generateNoteId } from '../../../helpers/generateId';
import { getEmailFromAccessToken } from '../../../helpers/getEmailFromAccessToken';
import { client, default_expiration } from '../../../helpers/redisConnector';
import { IUser } from '../user/user.interface';
import { INote } from './note.interface';
import { Note } from './note.model';

const createNote = async (payload: INote): Promise<INote> => {
  const date = new Date();
  const noteID = await generateNoteId();
  const formattedDate = customDateFormat(date);
  const NotePayload: INote = { ...payload, date: formattedDate, id: noteID };
  const result = await Note.create(NotePayload);
  await client.del(`notes:${payload.email}`);
  return result;
};

const getAllNotes = async (accessToken: string) => {
  const email = getEmailFromAccessToken(accessToken);
  const cachedNotes = await client.get(`notes:${email}`);
  if (cachedNotes) {
    return JSON.parse(cachedNotes);
  } else {
    const notes = (await Note.find({}).populate('userID')) as Array<{
      userID: IUser;
    }>;
    const filteredNotes = notes.filter(
      note => note.userID && note.userID.email === email
    );
    await client.setEx(
      `notes:${email}`,
      default_expiration as number,
      JSON.stringify(filteredNotes) as string
    );
    return filteredNotes;
  }
};

const getSingleNote = async (id: string) => {
  const result = await Note.find({ _id: id }).populate('userID');
  return result;
};

const deleteNote = async (id: string, accessToken: string) => {
  const email = getEmailFromAccessToken(accessToken);
  const result = await Note.findByIdAndDelete({ _id: id });
  await client.del(`notes:${email}`);
  return result;
};

const updateNote = async (
  id: string,
  payload: Partial<INote>,
  accessToken: string
): Promise<INote | null> => {
  const email = getEmailFromAccessToken(accessToken);
  const noteToUpdate = (await Note.findById(id).populate('userID')) as {
    userID: IUser;
  };
  if (!noteToUpdate || noteToUpdate.userID.email !== email) {
    throw new Error('Unauthorized');
  }
  const updatedNote = await Note.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  await client.del(`notes:${email}`);
  return updatedNote;
};
export const NoteService = {
  createNote,
  deleteNote,
  getAllNotes,
  getSingleNote,
  updateNote,
};
