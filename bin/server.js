import app from "../app.js";
import mongoDb from "../db/mongoDB.js";
const PORT = process.env.PORT || 3000;

mongoDb
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Server can't be run. Error: ${error.message}`);
  });
