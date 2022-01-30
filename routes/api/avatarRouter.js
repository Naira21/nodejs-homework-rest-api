import { Router } from "express";
import security from "../../middlewares/security.js";
import { upload } from "../../middlewares/upload.js";
import {
  uploadAvatar,
  verifyUser,
  retryEmailForVerifiedUser,
} from "../../controllers/users/index.js";

const router = new Router();

router.patch("/avatar", security, upload.single("avatar"), uploadAvatar);
router.get("/verify/:token", verifyUser);
router.post("/verify", retryEmailForVerifiedUser);

export default router;
