import { Note } from '../app/modules/note/note.model';
import { User } from '../app/modules/user/user.model';
export const findLastNoteId = async (): Promise<string | undefined> => {
  const lastnote = await Note.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastnote?.id ? lastnote.id.substring(2) : undefined;
};
export const generateNoteId = async (): Promise<string> => {
  const currentId = await findLastNoteId();
  const parsedId = currentId ? parseInt(currentId) : 0;
  const incrementedId = (parsedId + 1).toString().padStart(5, '0');
  const noteId = `N-${incrementedId}`;
  return noteId;
};

export const findLastUserId = async (): Promise<string | undefined> => {
  const lastUser = await User.findOne({}, { userID: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastUser?.userID ? lastUser.userID.substring(2) : undefined;
};

export const generateUserId = async (): Promise<string> => {
  const currentId = await findLastUserId();
  const parsedId = currentId ? parseInt(currentId) : 0;
  const incrementedId = (parsedId + 1).toString().padStart(5, '0');
  const userId = `U-${incrementedId}`;
  return userId;
};
