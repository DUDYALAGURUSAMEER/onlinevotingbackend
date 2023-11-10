const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());
const usersRoute = require("./routes/usersRoute");
app.use("/api/users", usersRoute);
const port = process.env.PORT || 5000;
const dbConfig = require("./config/dbConfig");
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
