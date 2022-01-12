import { listContacts } from "../../model/contacts/index.js";

export const getContacts = async (req, res, next) => {
  const { id: userId } = req.user;
  const contactsBase = await listContacts(userId, req.query);
  res
    .status(200)
    .json({ status: "success", code: 200, data: { contactsBase } });
};
