import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string(),
      lastName: z.string(),
    }),
    email: z.string().email(),
    contactNo: z.string(),
    password: z.string().min(6) 
  }),
});


const updateUserZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
    }),
  }),
});

export const UserValidaion = {
  updateUserZodSchema,
  createUserZodSchema
};
