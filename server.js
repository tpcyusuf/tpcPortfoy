require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("SERVER OK");
});

app.get("/test", (req, res) => {
  res.send("TEST OK");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server started on port:", PORT);
});
