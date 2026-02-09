require('dotenv').config();
const express = require('express');
const axios = require('axios'); // Nodemailer yerine axios kullanıyoruz
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Statik dosyaları (index.html, css, js) sunar
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Brevo API üzerinden mail gönderen bölüm
app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        // server.js içindeki post isteğinin içi
        await axios.post('https://api.brevo.com/v3/smtp/email', {
            // Name kısmını silebiliriz veya paneldekiyle aynı yapmalıyız
            sender: { name: "Portfolyo", email: "ysftpwebsite@gmail.com" },
            to: [{ email: "ysftpwebsite@gmail.com" }],
            replyTo: { email: email, name: name },
            subject: `Portfolyo: ${name}`,
            textContent: `Gönderen: ${name} (${email})\n\nMesaj: ${message}`,
            htmlContent: `<p><strong>Gönderen:</strong> ${name} (${email})</p><p>${message}</p>`
        }, {
            headers: {
                'api-key': process.env.BREVO_API_KEY,
                'Content-Type': 'application/json'
            }
        });

        console.log("Mesaj başarıyla Brevo üzerinden iletildi.");
        res.status(200).send('Başarılı!');
    } catch (error) {
        // Hata detayını Render loglarında net görebilmek için
        console.error("Brevo API Hatası:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Mesaj iletilemedi." });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Sunucu aktif: ${PORT}`));