const transporter = require('../config/email');

const sendContactEmail = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validasyon
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Tüm alanlar zorunludur.' });
    }

    // Debug için env değerlerini kontrol et
    console.log('ENV değerleri:', {
      SMTP_USER: process.env.SMTP_USER,
      EMAIL_FROM: process.env.EMAIL_FROM,
      EMAIL_TO: process.env.EMAIL_TO
    });

    // E-posta içeriği
    const mailOptions = {
      from: process.env.SMTP_USER, // SMTP_USER kullan
      to: process.env.SMTP_USER,   // Aynı adrese gönder
      subject: `Yeni İletişim Formu Mesajı - ${name}`,
      html: `
        <h3>Yeni İletişim Formu Mesajı</h3>
        <p><strong>İsim:</strong> ${name}</p>
        <p><strong>E-posta:</strong> ${email}</p>
        <p><strong>Mesaj:</strong> ${message}</p>
      `
    };

    // E-postayı gönder
    console.log('Mail gönderme denemesi:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    });

    const info = await transporter.sendMail(mailOptions);
    console.log('Mail gönderildi:', info);

    res.status(200).json({ message: 'Mesajınız başarıyla gönderildi!' });
  } catch (error) {
    console.error('E-posta gönderme hatası:', error);
    res.status(500).json({ error: 'Mesaj gönderilirken bir hata oluştu.' });
  }
};

module.exports = {
  sendContactEmail
};
