import { getContactById } from "../../model/contacts/index.js";

export const getContactsByID = async (req, res, next) => {
  const { id } = req.params;
  const contactById = await getContactById(id);
  if (contactById) {
    return res
      .status(200)
      .json({ status: "success", code: 200, data: { contactById } });
  }
  res.status(404).json({ status: "error", code: 404, message: "Not found" });
};
