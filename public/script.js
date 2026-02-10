document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    const status = document.getElementById('status-message');
    status.innerText = "Gönderiliyor...";

    try {
        const response = await fetch('/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            status.innerText = "Mesajınız başarıyla iletildi!";
            document.getElementById('contact-form').reset();

            setTimeout(() => {
                window.location.href = "/";
            }, 1500);
        } else {
            const text = await response.text();
            status.innerText = "Hata: " + text;
        }
    } catch (err) {
        status.innerText = "Sunucuya bağlanılamadı.";
    }
});
