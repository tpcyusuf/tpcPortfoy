require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Server çalışıyor ✅");
});

// TEST endpoint
app.get("/test", (req, res) => {
  res.send("API OK 🚀");
});

// MAIL endpoint (şimdilik boş – çökmesin diye)
app.post("/send-email", async (req, res) => {
  try {
    console.log("Gelen veri:", req.body);
    res.status(200).send("Mail endpoint çalışıyor");
  } catch (err) {
    console.error("MAIL HATA:", err);
    res.status(500).send("Mail gönderilemedi");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server çalışıyor → PORT:", PORT);
});
