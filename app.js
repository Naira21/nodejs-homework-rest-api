import express from "express";
import logger from "morgan";
import cors from "cors";
import {} from "dotenv/config";

import contactsRouter from "./routes/api/contactRouters.js";
import userRouter from "./routes/api/userRouters.js";
import avatarRouter from "./routes/api/avatarRouter.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static(process.env.AVATARS_FOLDER));

app.use("/api/users", userRouter);
app.use("/api/contacts", contactsRouter);
app.use("/users", avatarRouter);

app.use((req, res) => {
  res.status(404).json({ status: "error", code: 404, message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ status: "failed", code: 500, message: err.message });
});

export default app;
