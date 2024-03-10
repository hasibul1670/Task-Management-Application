/* eslint-disable no-console */
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { client } from '../../../server';
import catchAsync from '../../../shared/catchAsync';
import sendReponse from '../../../shared/sendResponse';
import { INote } from './note.interface';
import { NoteService } from './note.services';

const default_expiration = 3600;
const sendFacultyResponse = (res: Response, message: string, data: any) => {
  sendReponse<INote>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message,
    data,
  });
};

const createNote = catchAsync(async (req: Request, res: Response) => {
  const { ...NoteData } = req.body;
  const result = await NoteService.createNote(NoteData);
  sendFacultyResponse(res, 'Note is Created Successfully!', result);
});

const getAllNotes = catchAsync(async (req: Request, res: Response) => {
  const value = await client.get('notes');

  if (value != null) {
    console.log('cached Hit');
    sendFacultyResponse(res, 'Notes retrieved successfully!', value);
  } else {
    console.log('cached missed');
    const token = req.headers.authorization;
    const result = await NoteService.getAllNotes(token as string);
    await client.setEx(
      'notes',
      default_expiration as number,
      JSON.stringify(result) as string
    );
    sendFacultyResponse(res, 'Notes retrieved successfully!', result);
  }
});

const deleteNote = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await NoteService.deleteNote(id);
  sendFacultyResponse(res, ' Note Deleted successfully !', result);
});

const getSingleNote = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await NoteService.getSingleNote(id);
  sendFacultyResponse(res, 'Single Note retrieved successfully !', result);
});

const updateNote = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const token = req.headers.authorization;
  const UpdateData = req.body;

  const result = await NoteService.updateNote(id, UpdateData, token as string);
  sendFacultyResponse(res, 'Note Data Is Updated successfully!', result);
});

export const NoteController = {
  createNote,
  getAllNotes,
  getSingleNote,
  deleteNote,
  updateNote,
};
