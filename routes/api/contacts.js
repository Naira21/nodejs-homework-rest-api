import express from "express";
import model from "../../model/index";
import { validateTemplate, validateRenewal, validateId } from "./validation.js";
const router = express.Router();

router.get("/", async (req, res, next) => {
  const contactsBase = await model.listContacts();
  res.status(200).json(contactsBase);
});

router.get("/:id", validateId, async (req, res, next) => {
  const { id } = req.params;
  const contactById = await model.getContactById(id);
  if (contactById) {
    return res.status(200).json(contactById);
  }
  res.status(404).json({ message: "Not found" });
});

router.post("/", validateTemplate, async (req, res, next) => {
  const newContact = await model.addContact(req.body);
  res.status(201).json(newContact);
});

router.delete("/:id", validateId, async (req, res, next) => {
  const { id } = req.params;
  const removedContact = await model.removeContact(id);
  if (removedContact) {
    return res.status(200).json({ message: "contact deleted" });
  }
  res.status(404).json({ message: "Not found" });
});

router.put("/:id", validateId, validateRenewal, async (req, res, next) => {
  const { id } = req.params;
  const modifiedContact = await model.updateContact(id, req.body);
  if (modifiedContact) {
    return res.status(200).json(modifiedContact);
  }
  res.status(404).json({ message: "Not found" });
});

export default router;
