document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('user_name').value,
        email: document.getElementById('user_email').value,
        message: document.getElementById('message').value
    };

    const status = document.getElementById('status-message');
    status.innerText = "Gönderiliyor...";

    try {
        const response = await fetch('https://portfolio-site-ox1v.onrender.com/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            status.innerText = "Mesajınız başarıyla iletildi!";
            document.getElementById('contact-form').reset();
        } else {
            status.innerText = "Bir hata oluştu.";
        }
    } catch (err) {
        status.innerText = "Sunucuya bağlanılamadı.";
    }
});