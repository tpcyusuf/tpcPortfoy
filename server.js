import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const response = await fetch("https://api.mailjet.com/v3.1/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.MAILJET_API_KEY}:${process.env.MAILJET_SECRET_KEY}`
          ).toString("base64"),
      },
      body: JSON.stringify({
        Messages: [
          {
            From: {
              Email: "painvenom@gmail.com",
              Name: "Website Contact",
            },
            To: [
              {
                Email: process.env.EMAIL_TO,
                Name: "Site Owner",
              },
            ],
            Subject: "Yeni İletişim Formu",
            TextPart: `
İsim: ${name}
Email: ${email}
Mesaj: ${message}
            `,
          },
        ],
      }),
    });

    if (response.ok) {
      res.send("Mesaj başarıyla gönderildi ✅");
    } else {
      const err = await response.text();
      res.status(500).send("Mail gönderilemedi ❌ " + err);
    }
  } catch (error) {
    res.status(500).send("Sunucu hatası ❌");
  }
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server çalışıyor → http://localhost:" + PORT);
});
