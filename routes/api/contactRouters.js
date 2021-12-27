import express from "express";
import {
  validateTemplate,
  validateRenewal,
  validateRenewalFavorite,
  validateId,
  validateQuery,
} from "../../middlewares/validation/contactValidation";
import {
  getContacts,
  getContactsByID,
  addedContact,
  removedContact,
  renewedContact,
} from "../../controllers/contacts/index";
const router = express.Router();

router.get("/", validateQuery, getContacts);
router.get("/:id", validateId, getContactsByID);
router.post("/", validateTemplate, addedContact);
router.delete("/:id", validateId, removedContact);
router.put("/:id", validateId, validateRenewal, renewedContact);
router.patch(
  "/:id/favorite",
  validateId,
  validateRenewalFavorite,
  renewedContact
);

export default router;
