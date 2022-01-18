import multer from "multer";
import {} from "dotenv/config";

const UPLOAD_DIR = process.env.UPLOAD_DIR;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now().toString()}_${file.originalname}`);
  },
});

export const upload = multer({
  storage: storage,
  limits: { fieldSize: 500000 },
  fileFilter(req, file, cb) {
    if (file.mimetype.includes("image")) {
      return cb(null, true);
    }

    cb(new Error("File of avatar has wrong format!"));
  },
});
