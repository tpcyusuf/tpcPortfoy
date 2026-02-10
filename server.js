require('dotenv').config();
const express = require('express');
const { Resend } = require('resend');
const cors = require('cors');

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(express.json());

app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const data = await resend.emails.send({
            from: 'onboarding@resend.dev', // Başlangıçta bunu kullan, domain onayına gerek yok
            to: 'ysftpwebsite@gmail.com',  // Mesajın geleceği adres
            subject: `Portfolyo İletişim: ${name}`,
            reply_to: email,               // Yanıtla dediğinde kullanıcıya gider
            html: `<strong>Gönderen:</strong> ${name} <br> <strong>Mesaj:</strong> ${message}`
        });

        res.status(200).json({ success: true, id: data.id });
    } catch (error) {
        console.error("Resend Hatası:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});


// Diğer kodların altına, app.listen'den önce ekle
app.get('/', (req, res) => {
    res.send('Backend Sunucusu Aktif ve Çalışıyor! 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda hazır.`));