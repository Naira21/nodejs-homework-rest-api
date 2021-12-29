import ContactModel from "../contactsScheme";

const getContactById = async (contactId) => {
  const result = await ContactModel.findById(contactId);
  return result;
};

export { getContactById };
