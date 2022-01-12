import ContactModel from "../contactsScheme.js";

export const updateContact = async (userId, contactId, body) => {
  const result = await ContactModel.findOneAndUpdate(
    {
      _id: contactId,
      owner: userId,
    },
    { ...body },
    { new: true }
  );
  return result;
};
