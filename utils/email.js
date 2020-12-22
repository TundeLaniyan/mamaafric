//- Email template adapted from https://github.com/leemunroe/responsive-html-email-template
//- Converted from HTML using https://html2pug.now.sh/

const nodemailer = require("nodemailer");
// const ejs = require('ejs');
// const htmlToText = require("html-to-text");

const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_PASSWORD);

class Email {
  constructor({ user, email, url, address, message }) {
    this.address = address;
    this.subject = subject;
    this.message = message;
    this.to = email;
    this.name = user.name;
    this.url = url;
    this.from = `Mama Africa <uchezekielomeni@gmail.com>`;
    // this.from = `Mama Africa <${process.env.NODE_ENV === 'production' ? process.env.GMAIL_DB_EMAIL_TEST : `Uche Omeni <uchezekielomeni@gmail.com>`}>`;
    console.log(this.name);
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      // Sendgrid
      return nodemailer.createTransport({
        service: "SendGrid",
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PW,
      },
    });
  }

  // Send the actual email
  async send() {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: this.subject,
      text: this.message,
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome({ template, subject }) {
    await this.send("welcome", "Welcome to the Natours Family!");
  }

  async sendAccepted({ template, subject }) {
    await this.send("welcome", "Welcome to the Natours Family!");
  }

  async sendDecline({ template, subject }) {
    await this.send("welcome", "Welcome to the Natours Family!");
  }
  async sendPasswordReset() {
    await this.send();
  }
}

const sendEmail = async (options) => {
  if (process.env.NODE_ENV === "production") {
    // Sendgrid
    const transporter = nodemailer.createTransport({
      service: "SendGrid",
      auth: {
        user: process.env.SENDGRID_USERNAME,
        pass: process.env.SENDGRID_PASSWORD,
      },
    });

    const mailOptions = {
      from: `Uche Omeni ${process.env.GMAIL_DB_EMAIL}`,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: `<p>${options.message}</p>`,
    };

    await transporter.sendMail(mailOptions);
  } else {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PW,
      },
    });

    const mailOptions = {
      from: `Uche Omeni <uchezekielomeni@gmail.com>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: `<p>${options.message}</p>`,
    };

    await transporter.sendMail(mailOptions);
  }
};

module.exports = {
  sendEmail,
  Email,
};
