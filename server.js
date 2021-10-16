require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const connetDB = require("./config/db");
connetDB();

app.use(express.json());
app.set("view engine", "ejs");
app.use('/',express.static("public"));
app.use(require("./routes"));
app.use("/api", require("./routes/apiRoute"));

app.listen(PORT, console.log(`Listening at http://localhost:${PORT}`));