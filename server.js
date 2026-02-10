require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch"); // node-fetch paketini kurmayı unutma

const app = express();
app.use(express.json());
app.use(express.static("public"));

// --- Ana test endpoint ---
app.get("/", (req, res) => {
  res.send("SERVER OK");
});

app.get("/test", (req, res) => {
  res.send("TEST OK");
});

// --- Formdan mail gönderme endpoint ---
app.post("/send-email", async (req, res) => {
  try {
    console.log("SEND EMAIL ENDPOINT ÇALIŞTI");

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).send("Eksik form verisi");
    }

    console.log("ENV KEY:", process.env.MAILJET_API_KEY ? "VAR" : "YOK");

    const response = await fetch("https://api.mailjet.com/v3.1/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.MAILJET_API_KEY + ":" + process.env.MAILJET_SECRET_KEY
          ).toString("base64"),
      },
      body: JSON.stringify({
        Messages: [
          {
            From: { Email: "painvenom@gmail.com", Name: "Website Contact" }, // Mailjet verified
            To: [{ Email: process.env.EMAIL_TO, Name: "Owner" }],
            ReplyTo: { Email: email, Name: name },
            Subject: "Yeni Form Mesajı",
            TextPart: message,
          },
        ],
      }),
    });

    const text = await response.text();
    console.log("MAILJET STATUS:", response.status);
    console.log("MAILJET RESPONSE:", text);

    if (response.status === 200) {
      res.send("Mail başarıyla gönderildi");
    } else {
      res.status(500).send("Mail gönderilemedi");
    }
  } catch (err) {
    console.error("HATA:", err);
    res.status(500).send("Mail gönderilemedi");
  }
});

// --- Mailjet sandbox test endpoint ---
app.get("/test-mailjet", async (req, res) => {
  try {
    console.log("TEST MAILJET ENDPOINT ÇALIŞTI");

    const response = await fetch("https://api.mailjet.com/v3.1/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.MAILJET_API_KEY + ":" + process.env.MAILJET_SECRET_KEY
          ).toString("base64"),
      },
      body: JSON.stringify({
        Messages: [
          {
            From: { Email: "painvenom@gmail.com", Name: "Website Test" },
            To: [{ Email: process.env.EMAIL_TO, Name: "Owner" }],
            Subject: "TEST MAILJET",
            TextPart:
              "Bu bir test mesajıdır. Sandbox modunda logları ve status 200 görebilirsiniz.",
          },
        ],
      }),
    });

    const text = await response.text();
    console.log("MAILJET STATUS:", response.status);
    console.log("MAILJET RESPONSE:", text);

    res.send({ status: response.status, body: text });
  } catch (err) {
    console.error("HATA:", err);
    res.status(500).send("Test mail gönderilemedi");
  }
});

// --- Server başlat ---
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server started on port:", PORT);
});
