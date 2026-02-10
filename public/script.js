document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const statusMessage = document.getElementById("status-message");
    const formNotice = document.getElementById("formNotice");

    // Form inputlarında herhangi bir değişiklik olduğunda uyarıyı göster, DOMAIN AKTİF OLUNCA kaldir ve yorum satiri yap
    const inputs = form.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
        input.addEventListener("input", () => {
            formNotice.style.display = "block"; // uyarıyı göster
        });
    });
    // Form inputlarında herhangi bir değişiklik olduğunda uyarıyı göster, DOMAIN AKTİF OLUNCA kaldir ve yorum satiri yap


    // --- Gönder tuşu devre dışı: Domain aktif olana kadar ---
    form.addEventListener("submit", async (e) => {
        e.preventDefault(); // Sayfa yenilenmesin


        // Form inputlarında herhangi bir değişiklik olduğunda uyarıyı göster, DOMAIN AKTİF OLUNCA kaldir ve yorum satiri yap
        formNotice.style.display = "block";
        statusMessage.textContent =
            " Mail gönderimi şu an yapım aşamasındadır, en kısa sürede yayına alınacaktır. Anlayışınız için teşekkür ederiz";
        // Form inputlarında herhangi bir değişiklik olduğunda uyarıyı göster, DOMAIN AKTİF OLUNCA kaldir ve yorum satiri yap



        /* 
        --- DOMAIN AKTİF OLUNCA KULLANACAĞIN GERÇEK GÖNDERİM KODU ---
        
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
        */
    });
});
