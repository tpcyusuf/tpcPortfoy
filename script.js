document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,    // id="name" olanı al
        email: document.getElementById('email').value,  // id="email" olanı al
        message: document.getElementById('message').value // id="message" olanı al
    };

    const status = document.getElementById('status-message');
    status.innerText = "Gönderiliyor...";

    try {
        const response = await fetch('https://tpcportfoy.onrender.com/send-email', {
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