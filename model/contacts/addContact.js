import ContactModel from "../contactsScheme.js";

export const addContact = async (userId, body) => {
  const insertContact = await ContactModel.create({ ...body, owner: userId });
  return insertContact;
};
