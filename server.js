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

app.post("/send-email", async (req, res) => {
  try {
    const { name, email, message } = req.body;

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
            From: {
              Email: process.env.EMAIL_TO,
              Name: "Website Contact",
            },
            To: [
              {
                Email: process.env.EMAIL_TO,
                Name: "Owner",
              },
            ],
            Subject: "Yeni iletişim formu",
            TextPart: `
İsim: ${name}
Email: ${email}
Mesaj: ${message}
            `,
          },
        ],
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(500).send(text);
    }

    res.send("OK");
  } catch (err) {
    res.status(500).send("Mail gönderilemedi");
  }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server started on port:", PORT);
});
