require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer'); // resend yerine nodemailer
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Postacı (Gmail) Ayarı
/* const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
}); */


const transporter = nodemailer.createTransport({
  service: 'gmail', // Host yerine direkt servisi belirtmek işleri kolaylaştırabilir
  host: "smtp.gmail.com",
  port: 465, // Tekrar 465'e dönelim ama aşağıdaki eklemelerle
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  family: 4, // IPv4 zorunlu
  connectionTimeout: 20000, // Zaman aşımı süresini 20 saniyeye çıkaralım
  greetingTimeout: 20000,
  socketTimeout: 20000
});


/* const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,               // 465 yerine 587 kullanıyoruz
  secure: false,           // 587 portu için burası false olmalı
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false // Sunucu sertifikası hatalarını es geçmek için (Render'da gerekebilir)
  },
  family: 4                // Önceki hatanı (IPv6) çözen kritik satır
}); */


app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        replyTo: email,
        subject: `Portfolyo İletişim: ${name}`,
        text: `Mesaj: ${message}\n\nİletişim: ${email}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: "Mesaj ulaştı!" });
    } catch (error) {
        console.error("Nodemailer Hatası:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda hazır.`));