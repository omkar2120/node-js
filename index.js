const express = require("express");
const app = express();
require("./db/conn");
require("dotenv").config();
const routes = require("./routes/route")
const port = process.env.PORT;
app.use(express.json());
app.use(routes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
