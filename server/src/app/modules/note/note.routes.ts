import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { NoteController } from './note.controller';
import { NoteValidation } from './note.validation';

const router = express.Router();
router.post(
  '/create-note',
  validateRequest(NoteValidation.createNoteZodSchema),
  NoteController.createNote
);
router.get('/:id', NoteController.getSingleNote);
router.delete(
  '/:id',

  NoteController.deleteNote
);

router.patch(
  '/:id',
  validateRequest(NoteValidation.updateNoteZodSchema),
  // auth(ENUM_USER_ROLE.ADMIN),
  NoteController.updateNote
);

router.get('/', NoteController.getAllNotes);

export const NoteRoutes = router;
