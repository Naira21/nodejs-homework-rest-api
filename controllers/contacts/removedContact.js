import { removeContact } from "../../model/contacts/index.js";

export const removedContact = async (req, res, next) => {
  const { id } = req.params;
  const removedContact = await removeContact(id);
  if (removedContact) {
    return res.status(200).json({
      status: "success",
      code: 200,
      data: { contact: removedContact },
    });
  }
  res.status(404).json({ status: "error", code: 404, message: "Not found" });
};