require('dotenv').config();
const express = require('express');
const { Resend } = require('resend');
const cors = require('cors');
const path = require('path');

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware Ayarları
app.use(cors());
app.use(express.json());

// ÖNEMLİ: Statik dosyaların 'public' klasöründe olduğunu belirttik
app.use(express.static(path.join(__dirname, 'public')));

// Ana sayfaya girildiğinde index.html'i gönder
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Mail Gönderme Rotası
app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const data = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'ysftpwebsite@gmail.com', //
            subject: `Portfolyo İletişim: ${name}`,
            replyTo: email,
            html: `
                <h3>Yeni İletişim Formu Mesajı</h3>
                <p><strong>Gönderen:</strong> ${name}</p>
                <p><strong>E-posta:</strong> ${email}</p>
                <p><strong>Mesaj:</strong> ${message}</p>
            `
        });

        res.status(200).json({ success: true, id: data.id });
    } catch (error) {
        console.error("Resend Hatası:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda hazır.`));