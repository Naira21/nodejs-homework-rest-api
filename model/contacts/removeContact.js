import ContactModel from "../contactsScheme.js";

export const removeContact = async (userId, contactId) => {
  const result = await ContactModel.findOneAndRemove({
    _id: contactId,
    owner: userId,
  });
  return result;
};
