import express from 'express';
import {
  getContacts,
  getContactByIdController,
  createContact,
  updateContact,
  deleteContact,
} from '../controllers/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactValidationSchema } from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const router = express.Router();

router.get('/', ctrlWrapper(getContacts));
router.get('/:contactId', ctrlWrapper(getContactByIdController));
router.post('/', ctrlWrapper(createContact));
router.patch('/:contactId', ctrlWrapper(updateContact));
router.delete('/:contactId', ctrlWrapper(deleteContact));
router.post(
  '/',
  validateBody(createContactValidationSchema),
  ctrlWrapper(createContactController),
);
router.patch(
  '/:contactId',
  isValidId,
  validateBody(createContactValidationSchema),
  ctrlWrapper(patchContactController),
);

export default router;
