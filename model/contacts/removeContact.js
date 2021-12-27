import ContactModel from "../contactsScheme";

export const removeContact = async (contactId) => {
  const result = await ContactModel.findByIdAndRemove(contactId);
  return result;
};
