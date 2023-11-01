import { z } from 'zod';

const createNoteZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    noteDescription: z.string({
      required_error: 'NoteDescription is required ',
    }),
    category: z.string({
      required_error: 'Note category is required ',
    }),
  }),
});

const updateNoteZodSchema = z.object({
  body: z.object({
    title: z.string({}).optional(),
    noteDescription: z.string({}).optional(),
    category: z.string({}).optional(),

 
  }),
});

export const NoteValidation = {
  createNoteZodSchema,
  updateNoteZodSchema,
};
