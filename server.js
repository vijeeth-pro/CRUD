require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.set("strictQuery", true);
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to db"));

app.use(express.json());

app.listen(5000, () => console.log("Server started on port 5000"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const subscribers = require("./router/subscribers");
app.use("/subscriber", subscribers);
