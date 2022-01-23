import app from "../app.js";
import mongoDb from "../db/mongoDB.js";
import { mkdir } from "fs/promises";
import {} from "dotenv/config";

const PORT = process.env.PORT || 3000;

mongoDb
  .then(() => {
    app.listen(PORT, async () => {
      await mkdir(process.env.UPLOAD_DIR, { recursive: true });
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Server can't be run. Error: ${error.message}`);
  });
