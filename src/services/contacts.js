import { contactsCollection } from '../db/models/Contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limitOnPage = perPage;
  const offset = (page - 1) * perPage;
  const contactsQuery = contactsCollection.find();

  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }

  if (typeof filter.isFavourite === 'boolean') {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const contactsCount = await contactsCollection
    .find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery
    .skip(offset)
    .sort({ [sortBy]: sortOrder })
    .limit(limitOnPage)
    .exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

// export const getAllContacts = async () => {
//   return await contactsCollection.find();
// };

export const getContactById = async (contactId) => {
  return await contactsCollection.findById(contactId);
};

export const addContact = async ({
  name,
  phoneNumber,
  email,
  isFavourite,
  contactType,
}) => {
  const newContact = new contactsCollection({
    name,
    phoneNumber,
    email,
    isFavourite,
    contactType,
  });

  return await newContact.save();
};

export const updateContactById = async (contactId, updates) => {
  return await contactsCollection.findByIdAndUpdate(contactId, updates, {
    new: true,
    runValidators: true,
  });
};

export const deleteContactById = async (contactId) => {
  return await contactsCollection.findByIdAndDelete(contactId);
};
