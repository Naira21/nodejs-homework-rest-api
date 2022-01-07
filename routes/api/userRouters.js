import express from "express";
import security from "../../middlewares/security.js";
import {
  signup,
  login,
  logout,
  current,
} from "../../controllers/users/index.js";
import { validateUserTemplate } from "../../middlewares/validation/userValidation.js";

const router = express.Router();

router.post("/signup", validateUserTemplate, signup);
router.post("/login", validateUserTemplate, login);
router.post("/logout", security, logout);
router.get("/current", security, current);

export default router;
