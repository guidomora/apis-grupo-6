const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "entrenapapp@gmail.com",
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

const sendResetEmail = async (to, resetLink) => {
  await transporter.sendMail({
    from: `"EntreApp" <${process.env.MAIL_USER}>`,
    to,
    subject: "Recuperación de contraseña",
    html: `<p>Hacé clic en el siguiente enlace para restablecer tu contraseña:</p>
           <a href="${resetLink}">${resetLink}</a>
           <p>Este enlace expirará en 15 minutos.</p>`,
  });
};

module.exports = {
  sendResetEmail,
};
