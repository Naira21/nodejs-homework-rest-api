import mongoose from "mongoose";
import {} from "dotenv/config";

const { connect, connection } = mongoose;
const uri = process.env.URI_DB;

const mongoDb = connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection.on("connected", () => {
  console.log("Database connection successful");
});

connection.on("error", (err) => {
  console.log(`Database connection failed with error: ${err.message}`);
});

connection.on("disconnected", () => {
  console.log("Database disconnected successful");
});

process.on("SIGINT", async () => {
  connection.close();
  console.log("connection DB closed");
  process.exit(1);
});

export default mongoDb;
