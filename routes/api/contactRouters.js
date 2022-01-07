import express from "express";
import {
  validateTemplate,
  validateRenewal,
  validateRenewalFavorite,
  validateId,
  validateQuery,
} from "../../middlewares/validation/contactValidation.js";
import {
  getContacts,
  getContactsByID,
  addedContact,
  removedContact,
  renewedContact,
} from "../../controllers/contacts/index.js";
import security from "../../middlewares/security.js";

const router = express.Router();

router.get("/", [security, validateQuery], getContacts);
router.get("/:id", [security, validateId], getContactsByID);
router.post("/", [security, validateTemplate], addedContact);
router.delete("/:id", [security, validateId], removedContact);
router.put("/:id", [security, validateId, validateRenewal], renewedContact);
router.patch(
  "/:id/favorite",
  [security, validateId, validateRenewalFavorite],
  renewedContact
);

export default router;
