const nodemailer = require("nodemailer");

exports.sendEmail = async (options) => {

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mandar.technocommet@gmail.com",
      pass: "vddiewtxdwtxyzup",
    },
  });

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: options.email,
    subject: options.subject,
    html: `
      <div style="background-color: #f1f1f1; padding: 20px;">
        <header style="text-align: center;">
          <h1 style="font-family: sans-serif; font-size: 40px; color: #515151;">${options.subject}</h1>
          <p style="font-size: 20px; color: #333;">Learning is Easier..</p>
        </header>

        <section style="padding: 20px; text-align: center;">
          ${options.message}
        </section>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
