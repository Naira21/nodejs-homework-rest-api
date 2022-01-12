import ContactModel from "../contactsScheme.js";

const getContactById = async (userId, contactId) => {
  const result = await ContactModel.findOne({ _id: contactId, owner: userId });
  return result;
};

export { getContactById };
