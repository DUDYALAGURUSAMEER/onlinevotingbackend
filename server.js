const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());
const usersRoute = require("./routes/usersRoute");
const pollRoute = require("./routes/pollRoute");

app.get("/health-check",(_req,res,next)=>{
    res.send("okay")
})
app.use("/api/users", usersRoute);
app.use("/api/polls", pollRoute);
const port = process.env.PORT || 5000;
const dbConfig = require("./config/dbConfig");

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});


