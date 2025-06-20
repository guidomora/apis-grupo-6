const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     user: process.env.MAIL_USER,
  //     pass: process.env.MAIL_PASS,
  //   },
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "entrenapapp@gmail.com",
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});

const sendResetEmail = async (to, resetLink) => {
  await transporter.sendMail({
    from: `"Tu App" <${process.env.MAIL_USER}>`,
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
