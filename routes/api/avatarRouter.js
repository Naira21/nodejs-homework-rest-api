import { Router } from "express";
import security from "../../middlewares/security.js";
import { upload } from "../../middlewares/upload.js";
import uploadAvatar from "../../controllers/users/uploadAvatar.js";
const router = new Router();

router.patch("/avatar", security, upload.single("avatar"), uploadAvatar);

export default router;
