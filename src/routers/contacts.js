import express from 'express';
import {
  getContacts,
  getContactByIdController,
  createContact,
  updateContact,
} from '../controllers/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const router = express.Router();

router.get('/', ctrlWrapper(getContacts));
router.get('/:contactId', ctrlWrapper(getContactByIdController));
router.post('/', ctrlWrapper(createContact));

router.patch('/:contactId', ctrlWrapper(updateContact));

export default router;
