require('dotenv').config(); // En üstte olması Render'ın değişkenleri görmesini kolaylaştırır
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Sunucuya, ana dizindeki statik dosyaları (html, css, js) sunmasını söyler
app.use(express.static(__dirname));

// Ana sayfaya gidildiğinde index.html dosyasını gönderir
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Gmail bağlantı ayarları
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


/* const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // 465 için true,  587 için false olmalı
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },

    tls: {
        // Render gibi bulut ortamlarında sertifika hatalarını önler
        rejectUnauthorized: false,
        minVersion: "TLSv1.2"
    },

    // Bu kısım bağlantı hatalarını daha net görmeni sağlar
    debug: true,
    logger: true
}); */

// Sunucu başlarken bağlantıyı test et
transporter.verify(function (error, success) {
    if (error) {
        console.log("Bağlantı hatası:", error);
    } else {
        console.log("Sunucu mail göndermeye hazır!");
    }
});

// Formdan gelen isteği yakalayan bölüm
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;
    // Buradaki 'name', 'email' ve 'message' kelimeleri, 
    // script.js'de oluşturduğun formData objesinin içindeki anahtarlarla BİREBİR aynı olmalı.

    const mailOptions = {
        from: process.env.EMAIL_USER, // Gönderen her zaman senin onaylı hesabın olmalı
        replyTo: email,              // Cevapla dediğinde kullanıcının maili çıksın
        to: process.env.EMAIL_USER,
        subject: `Portfolyo İletişim: ${name}`,
        text: `Gönderen: ${name} (${email})\n\nMesaj: ${message}`
    };

    /* const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: `Portfolyo İletişim: ${name}`,
        text: `Gönderen: ${name} (${email})\n\nMesaj: ${message}`
    }; */

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Gönderim Hatası:", error);
            return res.status(500).send("Mail gönderilemedi.");
        }
        res.status(200).send('Başarılı!');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Sunucu http://localhost:${PORT} üzerinde hazır!`));




/* const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Gmail adresin
        pass: process.env.EMAIL_PASS  // 16 haneli Uygulama Şifren
    }
});

app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: `Portfolyo İletişim: ${name}`,
        text: `Gönderen: ${name} (${email})\n\nMesaj: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Mesaj başarıyla gönderildi!');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda çalışıyor.`)); */