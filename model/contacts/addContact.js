import ContactModel from "../contactsScheme";

export const addContact = async (body) => {
  const insertContact = await ContactModel.create(body);
  return insertContact;
};
