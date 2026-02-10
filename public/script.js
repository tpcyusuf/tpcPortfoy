document.getElementById("contact-form").addEventListener("submit", async function(e) {
  e.preventDefault(); // SAYFA YENİLENMESİN

  const formData = {
    name: document.querySelector('[name="name"]').value,
    email: document.querySelector('[name="email"]').value,
    message: document.querySelector('[name="message"]').value,
  };

  const response = await fetch("https://tpcwebsite-tzc06coa.b4a.run/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    alert("Mesaj gönderildi ✅");
    window.location.reload(); // ANA SAYFAYA DÖN
  } else {
    alert("Hata oluştu ❌");
  }
});






/* document.getElementById('contact-form').addEventListener('submit', async (e) => {
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
 */