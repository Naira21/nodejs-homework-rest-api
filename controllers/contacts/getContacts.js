import { listContacts } from "../../model/contacts/index.js";

export const getContacts = async (req, res, next) => {
  const contactsBase = await listContacts(req.query);
  res
    .status(200)
    .json({ status: "success", code: 200, data: { contactsBase } });
};
