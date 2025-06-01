---
title: "צרו קשר"
tags: ["צרו קשר" ]
author: " עמיר אייל"
sidebar: left
weight: 5
menu: main
---

אנא מלא את הטופס הבא ונחזור אליך בהקדם:

<form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" id="contactForm" class="contact-form">
  <input type="hidden" name="form-name" value="contact" />
  <p class="hidden">
    <label>אל תמלא שדה זה אם אתה בן אדם: <input name="bot-field" /></label>
  </p>

  <label for="name">שם מלא</label>
  <input type="text" id="name" name="name" required placeholder="הכנס את שמך" />

  <label for="email">אימייל</label>
  <input type="email" id="email" name="email" required placeholder="example@mail.com" />

  <label for="message">הודעה</label>
  <textarea id="message" name="message" rows="5" required placeholder="מה תרצה לכתוב?"></textarea>

  <button type="submit">שלח</button>
</form>

<div id="form-message" style="display:none; margin-top:20px; font-weight:bold; color:green;">
  תודה! ההודעה שלך נשלחה בהצלחה.
</div>

<script>
  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('form-message');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const data = new FormData(form);

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data).toString()
    })
    .then(response => {
      if (response.ok) {
        form.style.display = 'none';
        formMessage.style.display = 'block';
      } else {
        alert('אירעה שגיאה בשליחת הטופס. אנא נסה שוב.');
      }
    })
    .catch(() => alert('אירעה שגיאה בשליחת הטופס. אנא נסה שוב.'));
  });
</script>

<style>
  .contact-form {
    max-width: 400px;
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    font-family: Arial, sans-serif;
  }
  .contact-form label {
    font-weight: bold;
    color: #333;
  }
  .contact-form input,
  .contact-form textarea {
    padding: 0.6rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
  }
  .contact-form input:focus,
  .contact-form textarea:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px #007bff;
  }
  .contact-form button {
    background-color: #007bff;
    color: white;
    padding: 0.8rem;
    border: none;
    border-radius: 5px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  .contact-form button:hover {
    background-color: #0056b3;
  }
  .hidden {
    display: none;
  }
</style>
