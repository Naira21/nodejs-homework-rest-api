import ContactModel from "../contactsScheme";

export const updateContact = async (contactId, body) => {
  const result = await ContactModel.findByIdAndUpdate(
    contactId,
    { ...body },
    { new: true }
  );
  return result;
};
