import { updateContact } from "../../model/contacts/index.js";

export const renewedContact = async (req, res, next) => {
  const { id } = req.params;
  const modifiedContact = await updateContact(id, req.body);
  if (modifiedContact) {
    return res.status(200).json({
      status: "success",
      code: 200,
      data: { updated_contact: modifiedContact },
    });
  }
  res.status(404).json({ status: "error", code: 404, message: "Not found" });
};
