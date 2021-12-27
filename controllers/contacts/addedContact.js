import { addContact } from "../../model/contacts/index.js";

export const addedContact = async (req, res, next) => {
  const newContact = await addContact(req.body);
  res
    .status(201)
    .json({ status: "success", code: 200, data: { contact: newContact } });
};
