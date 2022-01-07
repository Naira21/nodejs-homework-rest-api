import { addContact } from "../../model/contacts/index.js";

export const addedContact = async (req, res, next) => {
  const { id: userId } = req.user;
  const newContact = await addContact(userId, req.body);
  res
    .status(201)
    .json({ status: "success", code: 200, data: { contact: newContact } });
};
